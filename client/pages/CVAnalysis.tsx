import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Star,
  Download,
  Sparkles,
} from "lucide-react";

interface CVAnalysisResult {
  skills: string[];
  experience: string;
  suggestedRoles: Array<{
    title: string;
    match: number;
    description: string;
    companies: string[];
  }>;
  industries: string[];
  salaryRange: string;
  strengthsWeaknesses: {
    strengths: string[];
    improvements: string[];
  };
}

export default function CVAnalysis() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResult | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx"))
    ) {
      setUploadedFile(file);
      setAnalysisResult(null);
    }
  };

  const analyzeCV = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI analysis progress
    const progressSteps = [
      { step: 20, text: "Extracting text from CV..." },
      { step: 40, text: "Analyzing skills and experience..." },
      { step: 60, text: "Matching with job market data..." },
      { step: 80, text: "Calculating role compatibility..." },
      { step: 100, text: "Generating recommendations..." },
    ];

    for (const { step } of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setAnalysisProgress(step);
    }

    // Mock analysis result
    const mockResult: CVAnalysisResult = {
      skills: [
        "React",
        "TypeScript",
        "Node.js",
        "Python",
        "SQL",
        "AWS",
        "Docker",
        "Git",
      ],
      experience: "Mid-level (3-5 years)",
      suggestedRoles: [
        {
          title: "Frontend Developer",
          match: 92,
          description: "Perfect match for your React and TypeScript expertise",
          companies: ["TechCorp", "InnovateLabs", "DesignStudio"],
        },
        {
          title: "Full Stack Developer",
          match: 87,
          description: "Great fit with your frontend and backend experience",
          companies: ["CloudScale", "DataFlow", "AppWorks"],
        },
        {
          title: "Software Engineer",
          match: 84,
          description: "Strong technical skills align with engineering roles",
          companies: ["AI Insights", "SecureNet", "TechCorp"],
        },
      ],
      industries: ["Technology", "Fintech", "E-commerce", "SaaS"],
      salaryRange: "$80k - $120k",
      strengthsWeaknesses: {
        strengths: [
          "Strong modern frontend frameworks",
          "Full-stack capabilities",
          "Cloud platform experience",
          "Version control proficiency",
        ],
        improvements: [
          "Consider learning mobile development",
          "Expand DevOps knowledge",
          "Add data science skills",
          "Strengthen system design",
        ],
      },
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
  };

  const findMatchingJobs = (role: string) => {
    // Navigate to jobs page with filters
    navigate(`/jobs?role=${encodeURIComponent(role)}`);
  };

  const findMatchingCompanies = (companies: string[]) => {
    // Navigate to companies page with filters
    navigate(`/companies?suggested=${companies.join(",")}`);
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
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50"
                asChild
              >
                <Link to="/cv-demo">
                  <Zap className="w-4 h-4 mr-2" />
                  Watch Live Demo
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-center">
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
              {/* Success Header */}
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center space-x-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-green-800">
                        Analysis Complete!
                      </h2>
                      <p className="text-green-700">
                        We've analyzed your CV and found great matches
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Insights */}
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
                      {analysisResult.suggestedRoles[0]?.match}%
                    </div>
                    <div className="text-gray-600">Best Match</div>
                  </CardContent>
                </Card>
              </div>

              {/* Suggested Roles */}
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
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {role.title}
                          </h3>
                          <Badge className="bg-green-100 text-green-700">
                            {role.match}% Match
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {role.description}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>Available at {role.companies.join(", ")}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => findMatchingJobs(role.title)}
                        >
                          View Jobs
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => findMatchingCompanies(role.companies)}
                        >
                          Find Companies
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Skills & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Identified Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-orange-200 text-orange-700"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <p className="text-sm">
                        <strong>Experience Level:</strong>{" "}
                        {analysisResult.experience}
                      </p>
                      <p className="text-sm">
                        <strong>Salary Range:</strong>{" "}
                        {analysisResult.salaryRange}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Career Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">
                        Strengths
                      </h4>
                      <ul className="text-sm space-y-1">
                        {analysisResult.strengthsWeaknesses.strengths.map(
                          (strength, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              {strength}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-700 mb-2">
                        Growth Areas
                      </h4>
                      <ul className="text-sm space-y-1">
                        {analysisResult.strengthsWeaknesses.improvements.map(
                          (improvement, index) => (
                            <li key={index} className="flex items-start">
                              <TrendingUp className="w-4 h-4 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                              {improvement}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setAnalysisResult(null);
                    setUploadedFile(null);
                  }}
                >
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
