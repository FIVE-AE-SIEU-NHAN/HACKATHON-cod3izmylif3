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
import {
  CheckCircle,
  Eye,
  Users,
  TrendingUp,
  Share2,
  ExternalLink,
  Calendar,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function JobPostedSuccess() {
  const navigate = useNavigate();

  const jobDetails = {
    title: "Senior Frontend Developer",
    company: "TechCorp",
    id: "JOB-2024-001",
    postedAt: new Date().toLocaleDateString(),
    status: "Active",
    visibility: "Public",
  };

  const expectedMetrics = {
    views: "50-80 views",
    applications: "12-20 applications",
    timeframe: "within 7 days",
    quality: "85% match rate",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Job Posted Successfully! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Your optimized job posting is now live and visible to qualified
              candidates
            </p>
            <Badge className="bg-green-100 text-green-700 text-base px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Optimized for Better Reach
            </Badge>
          </div>

          {/* Job Details Card */}
          <Card className="mb-8 border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-gray-900">
                    {jobDetails.title}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">{jobDetails.company}</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-700 mb-2">
                    {jobDetails.status}
                  </Badge>
                  <p className="text-sm text-gray-500">
                    Job ID: {jobDetails.id}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Posted Date
                    </p>
                    <p className="text-sm text-gray-600">
                      {jobDetails.postedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Visibility
                    </p>
                    <p className="text-sm text-gray-600">
                      {jobDetails.visibility}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      AI Match Score
                    </p>
                    <p className="text-sm text-gray-600">94% Optimized</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t">
                <Button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                  <Eye className="w-4 h-4 mr-2" />
                  View Live Job Posting
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Job Link
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/employer-dashboard")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Expected Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                  Expected Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Estimated Views</span>
                  <span className="font-semibold text-orange-600">
                    {expectedMetrics.views}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Expected Applications</span>
                  <span className="font-semibold text-orange-600">
                    {expectedMetrics.applications}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time Frame</span>
                  <span className="font-semibold text-orange-600">
                    {expectedMetrics.timeframe}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Quality Match Rate</span>
                  <span className="font-semibold text-green-600">
                    {expectedMetrics.quality}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-orange-600" />
                  AI Optimizations Applied
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Keywords Optimized
                    </p>
                    <p className="text-xs text-gray-600">
                      Enhanced for better search visibility
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Skills Structured
                    </p>
                    <p className="text-xs text-gray-600">
                      Organized for AI candidate matching
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Requirements Clarified
                    </p>
                    <p className="text-xs text-gray-600">
                      Clear expectations for better applications
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Inclusive Language
                    </p>
                    <p className="text-xs text-gray-600">
                      Attracts diverse, qualified candidates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What's Next?
                </h3>
                <p className="text-gray-700 mb-6">
                  Your job is now live! Here's what you can do to maximize your
                  hiring success:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Review Applications
                    </h4>
                    <p className="text-sm text-gray-600">
                      Monitor incoming applications and AI match scores
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Track Performance
                    </h4>
                    <p className="text-sm text-gray-600">
                      Monitor views, applications, and engagement metrics
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Share2 className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Share & Promote
                    </h4>
                    <p className="text-sm text-gray-600">
                      Share on social media and with your network
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => navigate("/employer-dashboard")}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/jd-analysis-demo")}
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    Post Another Job
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
