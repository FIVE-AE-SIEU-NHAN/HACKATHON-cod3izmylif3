import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Brain,
  FileText,
  Sparkles,
  Target,
  Users,
  MapPin,
  DollarSign,
  Clock,
  X,
  Edit,
  CheckCircle,
  Building,
  Briefcase,
  Zap,
} from "lucide-react";

interface ParsedJD {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills: string[];
}

export default function JDAnalysisDemo() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [scanStep, setScanStep] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [parsedJD, setParsedJD] = useState<ParsedJD>({
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $180,000",
    description:
      "We are looking for a passionate Senior Frontend Developer to join our innovative team. You will be responsible for building cutting-edge web applications using React, TypeScript, and modern frontend technologies.",
    requirements: [
      "5+ years of experience with React and JavaScript",
      "Strong proficiency in TypeScript",
      "Experience with modern CSS frameworks (TailwindCSS preferred)",
      "Knowledge of state management libraries (Redux, Zustand)",
      "Bachelor's degree in Computer Science or related field",
    ],
    responsibilities: [
      "Develop and maintain high-quality frontend applications",
      "Collaborate with design and backend teams",
      "Mentor junior developers",
      "Participate in code reviews and technical discussions",
      "Optimize application performance and user experience",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Unlimited PTO",
    ],
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Git",
      "REST APIs",
      "GraphQL",
      "Testing",
    ],
  });
  const navigate = useNavigate();

  const startScanning = () => {
    setIsScanning(true);
    setScanProgress(0);
    setShowResults(false);

    const steps = [
      { progress: 20, text: "Extracting text from Job Description..." },
      { progress: 40, text: "Analyzing job requirements..." },
      { progress: 60, text: "Identifying key skills and qualifications..." },
      { progress: 80, text: "Processing salary and benefits..." },
      { progress: 100, text: "Optimizing job posting for better reach..." },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setScanProgress(steps[currentStep].progress);
        setScanStep(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setShowResults(true);
        }, 500);
      }
    }, 1200);
  };

  const closeResults = () => {
    setShowResults(false);
    setScanProgress(0);
    setScanStep("");
    setIsEditing(false);
  };

  const confirmAndPost = () => {
    navigate("/job-posted-success");
  };

  const handleInputChange = (field: keyof ParsedJD, value: string) => {
    setParsedJD((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: keyof ParsedJD,
    index: number,
    value: string,
  ) => {
    setParsedJD((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) =>
        i === index ? value : item,
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Job Description Analysis
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Upload your Job Description and let our AI optimize it for better
              candidate matching
            </p>
            <Button
              onClick={startScanning}
              disabled={isScanning}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              {isScanning ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing JD...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  Start AI Analysis
                </>
              )}
            </Button>
          </div>

          {/* JD Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sample Job Description */}
            <Card
              className={`relative ${isScanning ? "ring-2 ring-orange-400 ring-opacity-75" : ""}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-orange-600" />
                  Sample Job Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Job Title & Company */}
                <div className="border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Senior Frontend Developer
                  </h2>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2" />
                      TechCorp Inc.
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Full-time
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      $120,000 - $180,000
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Job Description
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    We are looking for a passionate Senior Frontend Developer to
                    join our innovative team. You will be responsible for
                    building cutting-edge web applications using React,
                    TypeScript, and modern frontend technologies.
                  </p>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 5+ years of experience with React and JavaScript</li>
                    <li>• Strong proficiency in TypeScript</li>
                    <li>
                      • Experience with modern CSS frameworks (TailwindCSS
                      preferred)
                    </li>
                    <li>
                      • Knowledge of state management libraries (Redux, Zustand)
                    </li>
                    <li>
                      • Bachelor's degree in Computer Science or related field
                    </li>
                  </ul>
                </div>

                {/* Responsibilities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Responsibilities
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>
                      • Develop and maintain high-quality frontend applications
                    </li>
                    <li>• Collaborate with design and backend teams</li>
                    <li>• Mentor junior developers</li>
                    <li>
                      • Participate in code reviews and technical discussions
                    </li>
                    <li>
                      • Optimize application performance and user experience
                    </li>
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "TypeScript",
                      "JavaScript",
                      "HTML/CSS",
                      "Git",
                      "REST APIs",
                      "GraphQL",
                      "Testing",
                    ].map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-orange-200 text-orange-700"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Scanning Overlay */}
                {isScanning && (
                  <div className="absolute inset-0 bg-orange-50 bg-opacity-90 flex items-center justify-center rounded-lg">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-gray-900">
                          AI Scanning JD...
                        </p>
                        <p className="text-sm text-gray-700">{scanStep}</p>
                        <div className="w-64 mx-auto">
                          <Progress value={scanProgress} className="h-2" />
                        </div>
                        <p className="text-xs text-gray-600">
                          {scanProgress}% Complete
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analysis Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-orange-600" />
                    How Our AI Optimizes Your JD
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-semibold text-sm">
                        1
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Content Analysis
                      </h4>
                      <p className="text-sm text-gray-600">
                        Extract key information including requirements, skills,
                        and job details for better structure.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-semibold text-sm">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Market Optimization
                      </h4>
                      <p className="text-sm text-gray-600">
                        Optimize language and keywords to attract the right
                        candidates and improve searchability.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-semibold text-sm">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Candidate Matching
                      </h4>
                      <p className="text-sm text-gray-600">
                        Structure the job post to improve AI matching with
                        qualified candidates.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expected Improvements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Candidate Match Rate
                      </span>
                      <span className="font-semibold text-green-600">+35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Application Quality
                      </span>
                      <span className="font-semibold text-green-600">+42%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Time to Hire
                      </span>
                      <span className="font-semibold text-green-600">-25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Search Visibility
                      </span>
                      <span className="font-semibold text-green-600">+60%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Results Popup with Editing */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Job Description Optimized!
                    </h2>
                    <p className="text-gray-600">
                      Review and edit before posting
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Preview" : "Edit"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeResults}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Editable Job Description */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    {isEditing ? (
                      <Input
                        id="title"
                        value={parsedJD.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 p-2 bg-gray-50 rounded text-lg font-semibold">
                        {parsedJD.title}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    {isEditing ? (
                      <Input
                        id="company"
                        value={parsedJD.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 p-2 bg-gray-50 rounded">
                        {parsedJD.company}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={parsedJD.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 p-2 bg-gray-50 rounded">
                        {parsedJD.location}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="salary">Salary Range</Label>
                    {isEditing ? (
                      <Input
                        id="salary"
                        value={parsedJD.salary}
                        onChange={(e) =>
                          handleInputChange("salary", e.target.value)
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 p-2 bg-gray-50 rounded">
                        {parsedJD.salary}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Job Description</Label>
                  {isEditing ? (
                    <Textarea
                      id="description"
                      value={parsedJD.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={4}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 p-3 bg-gray-50 rounded leading-relaxed">
                      {parsedJD.description}
                    </p>
                  )}
                </div>

                {/* Requirements */}
                <div>
                  <Label>Requirements</Label>
                  <div className="mt-1 space-y-2">
                    {parsedJD.requirements.map((req, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-orange-600 mt-1">•</span>
                        {isEditing ? (
                          <Input
                            value={req}
                            onChange={(e) =>
                              handleArrayChange(
                                "requirements",
                                index,
                                e.target.value,
                              )
                            }
                            className="flex-1"
                          />
                        ) : (
                          <p className="flex-1 p-2 bg-gray-50 rounded">{req}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <Label>Required Skills</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {parsedJD.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-orange-200 text-orange-700"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t mt-6">
                <Button
                  onClick={confirmAndPost}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Confirm & Post Job
                </Button>
                <Button variant="outline" onClick={closeResults}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
