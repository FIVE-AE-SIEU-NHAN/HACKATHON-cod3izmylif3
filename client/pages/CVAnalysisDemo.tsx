import { useState, useEffect } from "react";
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
import {
  Brain,
  FileText,
  Zap,
  Target,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Star,
  X,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function CVAnalysisDemo() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [scanStep, setScanStep] = useState("");
  const navigate = useNavigate();

  const startScanning = () => {
    setIsScanning(true);
    setScanProgress(0);
    setShowResults(false);

    const steps = [
      { progress: 15, text: "Extracting text from CV..." },
      { progress: 35, text: "Analyzing skills and experience..." },
      { progress: 55, text: "Processing work history..." },
      { progress: 75, text: "Matching with job market data..." },
      { progress: 90, text: "Calculating role compatibility..." },
      { progress: 100, text: "Generating recommendations..." },
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
  };

  const redirectToCompanies = () => {
    navigate("/cv-matched-companies");
  };

  const redirectToJobs = () => {
    navigate("/jobs");
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
              AI CV Analysis Demo
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Watch our AI analyze this sample CV and discover perfect job
              matches
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
                  Analyzing CV...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  Start AI Analysis
                </>
              )}
            </Button>
          </div>

          {/* CV Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sample CV */}
            <Card
              className={`relative ${isScanning ? "ring-2 ring-orange-400 ring-opacity-75" : ""}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-orange-600" />
                  Sample CV - Sarah Johnson
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Info */}
                <div className="border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Sarah Johnson
                  </h2>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      sarah.johnson@email.com
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      +1 (555) 123-4567
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      San Francisco, CA
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Professional Summary
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Experienced Frontend Developer with 5+ years of expertise in
                    React, TypeScript, and modern web technologies. Passionate
                    about creating exceptional user experiences and leading
                    cross-functional teams to deliver high-quality products.
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Work Experience
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-900">
                          Senior Frontend Developer
                        </h4>
                        <span className="text-sm text-gray-500">
                          2021 - Present
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        TechCorp Inc.
                      </p>
                      <p className="text-xs text-gray-600">
                        Led development of React-based applications, mentored
                        junior developers, and improved performance by 40%.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-900">
                          Frontend Developer
                        </h4>
                        <span className="text-sm text-gray-500">
                          2019 - 2021
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">StartupXYZ</p>
                      <p className="text-xs text-gray-600">
                        Built responsive web applications using React and
                        TypeScript, collaborated with design teams.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "TypeScript",
                      "JavaScript",
                      "Node.js",
                      "HTML/CSS",
                      "Git",
                      "AWS",
                      "Docker",
                      "Jest",
                      "GraphQL",
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

                {/* Education */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Education
                  </h3>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      B.S. Computer Science
                    </h4>
                    <p className="text-sm text-gray-600">
                      University of California, Berkeley • 2015-2019
                    </p>
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
                          AI Scanning in Progress...
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
                    How Our AI Works
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
                        Text Extraction
                      </h4>
                      <p className="text-sm text-gray-600">
                        Our AI parses and extracts all relevant information from
                        your CV including experience, skills, and education.
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
                        Skill Analysis
                      </h4>
                      <p className="text-sm text-gray-600">
                        Advanced algorithms analyze your technical and soft
                        skills to understand your professional profile.
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
                        Job Matching
                      </h4>
                      <p className="text-sm text-gray-600">
                        We match your profile against thousands of job
                        opportunities to find the perfect fit.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expected Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Role Matches Found
                      </span>
                      <span className="font-semibold text-orange-600">3-5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Skills Identified
                      </span>
                      <span className="font-semibold text-orange-600">10+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Companies Matched
                      </span>
                      <span className="font-semibold text-orange-600">15+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Match Accuracy
                      </span>
                      <span className="font-semibold text-orange-600">
                        90%+
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Results Popup Overlay */}
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
                      Analysis Complete!
                    </h2>
                    <p className="text-gray-600">
                      We found amazing matches for Sarah's profile
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeResults}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      10
                    </div>
                    <div className="text-sm text-gray-600">Skills Found</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      3
                    </div>
                    <div className="text-sm text-gray-600">Perfect Matches</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      94%
                    </div>
                    <div className="text-sm text-gray-600">Best Match</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      $95k
                    </div>
                    <div className="text-sm text-gray-600">Avg Salary</div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Role Matches */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-orange-600" />
                  Top Role Matches
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Senior Frontend Developer",
                      match: 94,
                      companies: ["TechCorp", "InnovateLabs"],
                      salary: "$90k - $130k",
                    },
                    {
                      title: "React Developer",
                      match: 91,
                      companies: ["DesignStudio", "CloudScale"],
                      salary: "$80k - $120k",
                    },
                    {
                      title: "Full Stack Developer",
                      match: 87,
                      companies: ["DataFlow", "AppWorks"],
                      salary: "$85k - $125k",
                    },
                  ].map((role, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {role.title}
                          </h4>
                          <Badge className="bg-green-100 text-green-700">
                            {role.match}% Match
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {role.companies.join(", ")}
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {role.salary}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={redirectToJobs}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        View Jobs
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button
                  onClick={redirectToCompanies}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Explore Matching Companies
                </Button>
                <Button
                  onClick={redirectToJobs}
                  variant="outline"
                  className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  Find Similar Jobs
                </Button>
                <Button variant="outline" onClick={closeResults}>
                  Close Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
