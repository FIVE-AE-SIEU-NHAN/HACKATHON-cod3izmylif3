import { useState } from "react";
import { DashboardLayout } from "../components/ui/dashboard-layout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  FileText,
  Eye,
  Download,
  Calendar,
  Building,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash,
  Send,
} from "lucide-react";

// Mock data
const generatedCVs = [
  {
    id: "cv-001",
    title: "Senior Frontend Developer CV",
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-20",
    status: "Active",
    aiScore: 94,
    matchedJobs: 12,
    views: 45,
    downloads: 8,
  },
  {
    id: "cv-002",
    title: "Full Stack Developer CV",
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-18",
    status: "Draft",
    aiScore: 87,
    matchedJobs: 8,
    views: 23,
    downloads: 3,
  },
  {
    id: "cv-003",
    title: "React Developer CV",
    createdAt: "2024-01-05",
    lastUpdated: "2024-01-15",
    status: "Archived",
    aiScore: 91,
    matchedJobs: 15,
    views: 67,
    downloads: 12,
  },
];

const jobApplications = [
  {
    id: "app-001",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp",
    companyLogo: "TC",
    appliedDate: "2024-01-20",
    status: "Under Review",
    statusColor: "bg-blue-100 text-blue-700",
    salary: "$120k - $180k",
    location: "San Francisco, CA",
    cvUsed: "Senior Frontend Developer CV",
    lastUpdate: "2024-01-22",
    interviewDate: null,
  },
  {
    id: "app-002",
    jobTitle: "React Developer",
    company: "InnovateLabs",
    companyLogo: "IL",
    appliedDate: "2024-01-18",
    status: "Interview Scheduled",
    statusColor: "bg-orange-100 text-orange-700",
    salary: "$100k - $150k",
    location: "New York, NY",
    cvUsed: "React Developer CV",
    lastUpdate: "2024-01-21",
    interviewDate: "2024-01-25",
  },
  {
    id: "app-003",
    jobTitle: "Frontend Engineer",
    company: "DesignStudio",
    companyLogo: "DS",
    appliedDate: "2024-01-15",
    status: "Accepted",
    statusColor: "bg-green-100 text-green-700",
    salary: "$90k - $130k",
    location: "Los Angeles, CA",
    cvUsed: "Frontend Developer CV",
    lastUpdate: "2024-01-23",
    interviewDate: null,
  },
  {
    id: "app-004",
    jobTitle: "Full Stack Developer",
    company: "StartupXYZ",
    companyLogo: "SX",
    appliedDate: "2024-01-12",
    status: "Rejected",
    statusColor: "bg-red-100 text-red-700",
    salary: "$80k - $120k",
    location: "Remote",
    cvUsed: "Full Stack Developer CV",
    lastUpdate: "2024-01-20",
    interviewDate: null,
  },
];

const appliedCompanies = [
  {
    id: "comp-001",
    name: "TechCorp",
    logo: "TC",
    totalApplications: 3,
    activeApplications: 2,
    acceptedApplications: 1,
    industry: "Technology",
    size: "1000-5000",
    lastApplication: "2024-01-20",
    status: "Active Candidate",
  },
  {
    id: "comp-002",
    name: "InnovateLabs",
    logo: "IL",
    totalApplications: 2,
    activeApplications: 1,
    acceptedApplications: 0,
    industry: "Technology",
    size: "200-500",
    lastApplication: "2024-01-18",
    status: "Under Review",
  },
  {
    id: "comp-003",
    name: "DesignStudio",
    logo: "DS",
    totalApplications: 1,
    activeApplications: 0,
    acceptedApplications: 1,
    industry: "Design",
    size: "50-200",
    lastApplication: "2024-01-15",
    status: "Hired",
  },
];

export default function CandidateDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review":
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case "Interview Scheduled":
        return <Calendar className="w-4 h-4 text-orange-500" />;
      case "Accepted":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout
      userRole="candidate"
      userName="John Doe"
      title="Candidate Dashboard"
      subtitle="Manage your CVs, applications, and career progress"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generated CVs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {generatedCVs.length}
            </div>
            <p className="text-xs text-muted-foreground">
              +1 created this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {jobApplications.length}
            </div>
            <p className="text-xs text-muted-foreground">+2 sent this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {appliedCompanies.length}
            </div>
            <p className="text-xs text-muted-foreground">Applied to</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">25%</div>
            <p className="text-xs text-muted-foreground">1 of 4 applications</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cvs">My CVs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobApplications.slice(0, 3).map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-orange-100 text-orange-600">
                            {app.companyLogo}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{app.jobTitle}</p>
                          <p className="text-xs text-gray-600">{app.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(app.status)}
                        <Badge className={app.statusColor}>{app.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active CVs */}
            <Card>
              <CardHeader>
                <CardTitle>Active CVs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedCVs
                    .filter((cv) => cv.status === "Active")
                    .map((cv) => (
                      <div
                        key={cv.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{cv.title}</p>
                          <p className="text-xs text-gray-600">
                            AI Score: {cv.aiScore}% • {cv.matchedJobs} matches
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cvs" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Generated CVs
              </h3>
              <p className="text-gray-600">
                Manage your AI-generated CVs and track their performance
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Generate New CV
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedCVs.map((cv) => (
              <Card key={cv.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{cv.title}</CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge
                          variant={
                            cv.status === "Active"
                              ? "default"
                              : cv.status === "Draft"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            cv.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : ""
                          }
                        >
                          {cv.status}
                        </Badge>
                        <Badge variant="outline">AI Score: {cv.aiScore}%</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Created</p>
                      <p className="font-medium">
                        {new Date(cv.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Updated</p>
                      <p className="font-medium">
                        {new Date(cv.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Job Matches</p>
                      <p className="font-medium text-orange-600">
                        {cv.matchedJobs}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Views</p>
                      <p className="font-medium">{cv.views}</p>
                    </div>
                  </div>
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Job Applications
            </h3>
            <p className="text-gray-600">
              Track your job applications and their current status
            </p>
          </div>

          <div className="space-y-4">
            {jobApplications.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          {app.companyLogo}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {app.jobTitle}
                          </h4>
                          <Badge className={app.statusColor}>
                            {app.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{app.company}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {app.location}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="w-4 h-4 mr-2" />
                            {app.salary}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            Applied:{" "}
                            {new Date(app.appliedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FileText className="w-4 h-4 mr-2" />
                            CV: {app.cvUsed}
                          </div>
                        </div>
                        {app.interviewDate && (
                          <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                            <div className="flex items-center text-orange-700">
                              <Calendar className="w-4 h-4 mr-2" />
                              Interview scheduled for{" "}
                              {new Date(app.interviewDate).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {getStatusIcon(app.status)}
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {app.status === "Interview Scheduled" && (
                          <Button size="sm">Prepare Interview</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Applied Companies
            </h3>
            <p className="text-gray-600">
              Companies you've applied to and your relationship with them
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliedCompanies.map((company) => (
              <Card
                key={company.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-orange-100 text-orange-600">
                        {company.logo}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <Badge
                        variant={
                          company.status === "Hired"
                            ? "default"
                            : company.status === "Active Candidate"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          company.status === "Hired"
                            ? "bg-green-100 text-green-700"
                            : company.status === "Active Candidate"
                              ? "bg-orange-100 text-orange-700"
                              : ""
                        }
                      >
                        {company.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Industry</p>
                      <p className="font-medium">{company.industry}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Size</p>
                      <p className="font-medium">{company.size}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Applications</p>
                      <p className="font-medium text-orange-600">
                        {company.totalApplications}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Active</p>
                      <p className="font-medium">
                        {company.activeApplications}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Last application:{" "}
                    {new Date(company.lastApplication).toLocaleDateString()}
                  </div>
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      View Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
