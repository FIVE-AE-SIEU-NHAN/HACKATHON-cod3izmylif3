import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link back for safety
import { Navigation } from "../components/ui/navigation";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import {
  Upload,
  FileText,
  Zap,
  Brain,
  Target,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Download,
  Sparkles,
  Clock,
  ListChecks,
} from "lucide-react";

// --- Data structure for the UI ---
interface CVAnalysisResult {
  name: string;
  skills: string[];
  experience: string;
  suggestedRoles: Array<{
    title: string;
    match: number;
    description: string;
    companies: string[];
    requiredSkills: string[];
    matchedSkills: string[];
    requiredExperience: number;
    userExperience: number;
  }>;
  industries: string[];
  salaryRange: string;
  strengthsWeaknesses: {
    strengths: string[];
    improvements: string[];
  };
}

// --- Data structures for the Python API response ---
interface CVData {
  name: string;
  age: string;
  skills: string[];
  experience: string[];
  education: string[];
}

interface JDMatch {
  job_title: string;
  job_overview: string;
  benefits: string;
  required_skills: string;
  matched_skills: string[];
  cv_years: number;
  jd_years: number;
  is_match: boolean;
}

interface ParsedCVResponse {
  cv_data: CVData;
  bit_string: string;
  matched_jds: JDMatch[];
}

// --- Interface for the Node.js backend request ---
export interface RegisterCVReqBody {
  user_id: string;
  skills: string;
  projects: string;
  experience: string;
  education: string;
}

// --- The Main Component ---
export default function CVAnalysis() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".doc") || file.name.endsWith(".docx"))) {
      setUploadedFile(file);
      setAnalysisResult(null);
    } else {
        alert("Only PDF, DOC, and DOCX files are supported.");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".doc") || file.name.endsWith(".docx"))) {
      setUploadedFile(file);
      setAnalysisResult(null);
    }
  };

  const transformApiResponse = (apiData: ParsedCVResponse): CVAnalysisResult => {
    const { cv_data, matched_jds } = apiData;
    const strengths = cv_data.skills || [];
    const allRequiredSkills = new Set<string>();
    matched_jds.forEach(jd => {
      if (jd.required_skills) {
        jd.required_skills.split(',').forEach(skill => allRequiredSkills.add(skill.trim()));
      }
    });
    const improvements = [...allRequiredSkills].filter(skill => 
        !strengths.some(s => s.toLowerCase() === skill.toLowerCase())
    );

    return {
      name: cv_data.name || "Candidate",
      skills: strengths,
      experience: `${matched_jds[0]?.cv_years ?? 'N/A'} years`,
      suggestedRoles: matched_jds.map(jd => {
        const required = jd.required_skills ? jd.required_skills.split(',').map(s => s.trim()).filter(Boolean) : [];
        const matchPercentage = required.length > 0
          ? Math.round(((jd.matched_skills?.length || 0) / required.length) * 100)
          : 100;
        
        return {
          title: jd.job_title,
          match: matchPercentage,
          description: jd.job_overview || "No description available.",
          companies: ["Leading Companies"],
          requiredSkills: required,
          matchedSkills: jd.matched_skills || [],
          requiredExperience: jd.jd_years,
          userExperience: jd.cv_years,
        };
      }),
      industries: ["Technology", "Software Development", "IT Services"],
      salaryRange: "Not specified by API",
      strengthsWeaknesses: {
        strengths: strengths,
        improvements: improvements.slice(0, 4),
      },
    };
  };

  const saveCVDataToNodeBackend = async (apiData: ParsedCVResponse) => {
    const { cv_data } = apiData;

    const payload: RegisterCVReqBody = {
      user_id: `a9e36d5d-5496-11f0-bfde-0242ac110002`,
      skills: (cv_data.skills || []).join(', '),
      experience: (cv_data.experience || []).join('\n'),
      education: (cv_data.education || []).join('\n'),
      projects: "Not specified in CV",
    };

    try {
      console.log("Sending CV data to Node.js backend:", payload);
      const response = await fetch("http://localhost:3000/user/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to save CV data to Node.js backend:", errorData);
      } else {
        const successData = await response.json();
        console.log("Successfully saved CV data:", successData);
      }
    } catch (error) {
      console.error("Error connecting to Node.js backend:", error);
    }
  };

  const analyzeCV = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const formData = new FormData();
    formData.append("pdf_file", uploadedFile);

    try {
      setAnalysisProgress(30);
      const response = await fetch("http://127.0.0.1:5000/upload_cv", {
        method: "POST",
        body: formData,
      });
      setAnalysisProgress(70);

      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

      const apiResponse: ParsedCVResponse = await response.json();
      
      await saveCVDataToNodeBackend(apiResponse);

      const formattedResult = transformApiResponse(apiResponse);

      setAnalysisProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));

      setAnalysisResult(formattedResult);

    } catch (err) {
      console.error("Analysis failed:", err);
      alert("An error occurred during CV analysis. Please try again.");
      setAnalysisProgress(0);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const findMatchingJobs = (role: string) => {
    navigate(`/jobs?role=${encodeURIComponent(role)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI-Powered CV Analysis
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Upload your CV and let our AI discover the perfect career matches
              for your skills and experience
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-center mt-8">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700">Instant Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700">Role Matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700">Career Insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {!analysisResult ? (
            <>
              {/* Upload Section */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="w-6 h-6 mr-2 text-orange-600" />
                    Upload Your CV
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    {uploadedFile ? (
                      <div className="space-y-4">
                        <FileText className="w-16 h-16 text-orange-600 mx-auto" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {uploadedFile.name}
                          </h3>
                          <p className="text-gray-600">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <div className="flex justify-center space-x-4">
                          <Button
                            onClick={analyzeCV}
                            disabled={isAnalyzing}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                          >
                            {isAnalyzing ? (
                              <>
                                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              <>
                                <Brain className="w-4 h-4 mr-2" />
                                Analyze CV
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setUploadedFile(null)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Drop your CV here or click to browse
                          </h3>
                          <p className="text-gray-600">
                            Supports PDF, DOC, DOCX files up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {isAnalyzing && (
                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Analyzing your CV...</span>
                        <span>{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-orange-600" />
                      AI Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Advanced AI scans your CV to extract skills, experience,
                      and career preferences with high accuracy.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Target className="w-5 h-5 mr-2 text-orange-600" />
                      Role Matching
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Get personalized job role recommendations based on your
                      unique profile and market demand.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                      Career Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Discover growth opportunities, salary expectations, and
                      skill gaps to advance your career.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            /* Analysis Results */
            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center space-x-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-green-800">
                        Analysis Complete for {analysisResult.name}!
                      </h2>
                      <p className="text-green-700">
                        We've analyzed your CV and found great matches.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {analysisResult.skills.length}
                    </div>
                    <div className="text-gray-600">Skills Identified</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {analysisResult.suggestedRoles.length}
                    </div>
                    <div className="text-gray-600">Role Matches</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {analysisResult.suggestedRoles[0]?.match ?? 0}%
                    </div>
                    <div className="text-gray-600">Best Match</div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-6 h-6 mr-2 text-orange-600" />
                    Recommended Roles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisResult.suggestedRoles.map((role, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-4 border rounded-lg hover:bg-gray-50/50"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {role.title}
                            </h3>
                            <Badge className="bg-green-100 text-green-700">
                              {role.match}% Match
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {role.description}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => findMatchingJobs(role.title)}
                          className="self-start md:self-center"
                        >
                          View Jobs
                        </Button>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>Required: <strong>{role.requiredExperience} yrs</strong></span>
                          <span>/</span>
                          <span>Your Exp: <strong>{role.userExperience} yrs</strong></span>
                          {role.userExperience >= role.requiredExperience ? (
                              <CheckCircle className="w-4 h-4 text-green-500"  />
                          ) : (
                              <span className="text-orange-600 font-medium text-xs rounded-full px-2 py-0.5 bg-orange-100" title="Experience gap">GAP</span>
                          )}
                        </div>
                        <div>
                          <h4 className="flex items-center text-sm font-medium text-gray-800 mb-2">
                            <ListChecks className="w-4 h-4 mr-1.5 text-gray-500" />
                            Skill Match Analysis
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {role.requiredSkills.map((skill, i) => {
                              const isMatched = role.matchedSkills.some(ms => ms.toLowerCase() === skill.toLowerCase());
                              return (
                                <Badge
                                  key={i}
                                  variant={isMatched ? "default" : "secondary"}
                                  className={`font-normal ${
                                    isMatched
                                      ? 'bg-green-100 text-green-800 border border-green-300 hover:bg-green-200'
                                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                                  }`}
                                >
                                  {isMatched && <CheckCircle className="w-3 h-3 mr-1 text-green-600" />}
                                  {skill}
                                </Badge>
                              );
                            })}
                            {role.requiredSkills.length === 0 && (
                                <p className="text-xs text-gray-500">No specific skills listed for this role.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader><CardTitle>Identified Skills</CardTitle></CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-orange-200 text-orange-700">{skill}</Badge>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <p className="text-sm"><strong>Experience Level:</strong> {analysisResult.experience}</p>
                      <p className="text-sm"><strong>Salary Range:</strong> {analysisResult.salaryRange}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Career Insights</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                      <ul className="text-sm space-y-1">
                        {analysisResult.strengthsWeaknesses.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              {strength}
                            </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-700 mb-2">Growth Areas</h4>
                      <ul className="text-sm space-y-1">
                        {analysisResult.strengthsWeaknesses.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start">
                              <TrendingUp className="w-4 h-4 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                              {improvement}
                            </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setAnalysisResult(null);
                    setUploadedFile(null);
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Analyze Another CV
                </Button>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}