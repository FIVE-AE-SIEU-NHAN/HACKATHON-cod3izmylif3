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
  Users,
  Building,
  Briefcase,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Edit,
  Trash,
  Ban,
  UserCheck,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";

// Mock data for Generated CVs
const generatedCVs = [
  {
    id: "cv-001",
    candidateName: "Sarah Johnson",
    candidateEmail: "sarah.johnson@email.com",
    title: "Senior Frontend Developer CV",
    createdAt: "2024-01-20",
    aiScore: 94,
    status: "Active",
    matchedJobs: 12,
    views: 45,
    applications: 8,
  },
  {
    id: "cv-002",
    candidateName: "Michael Chen",
    candidateEmail: "michael.chen@email.com",
    title: "Product Manager CV",
    createdAt: "2024-01-18",
    aiScore: 89,
    status: "Active",
    matchedJobs: 15,
    views: 67,
    applications: 12,
  },
  {
    id: "cv-003",
    candidateName: "Emily Rodriguez",
    candidateEmail: "emily.rodriguez@email.com",
    title: "Full Stack Developer CV",
    createdAt: "2024-01-15",
    aiScore: 91,
    status: "Draft",
    matchedJobs: 8,
    views: 23,
    applications: 3,
  },
  {
    id: "cv-004",
    candidateName: "David Kim",
    candidateEmail: "david.kim@email.com",
    title: "DevOps Engineer CV",
    createdAt: "2024-01-12",
    aiScore: 87,
    status: "Active",
    matchedJobs: 10,
    views: 34,
    applications: 5,
  },
];

// Mock data for Job Applications
const allJobApplications = [
  {
    id: "app-001",
    candidateName: "Sarah Johnson",
    candidateEmail: "sarah.johnson@email.com",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp",
    appliedDate: "2024-01-20",
    status: "Under Review",
    statusColor: "bg-blue-100 text-blue-700",
    aiMatchScore: 94,
    location: "San Francisco, CA",
    salary: "$120k - $180k",
  },
  {
    id: "app-002",
    candidateName: "Michael Chen",
    candidateEmail: "michael.chen@email.com",
    jobTitle: "Product Manager",
    company: "InnovateLabs",
    appliedDate: "2024-01-18",
    status: "Interview Scheduled",
    statusColor: "bg-orange-100 text-orange-700",
    aiMatchScore: 89,
    location: "New York, NY",
    salary: "$100k - $150k",
  },
  {
    id: "app-003",
    candidateName: "Emily Rodriguez",
    candidateEmail: "emily.rodriguez@email.com",
    jobTitle: "Frontend Engineer",
    company: "DesignStudio",
    appliedDate: "2024-01-17",
    status: "Hired",
    statusColor: "bg-green-100 text-green-700",
    aiMatchScore: 91,
    location: "Los Angeles, CA",
    salary: "$90k - $130k",
  },
  {
    id: "app-004",
    candidateName: "David Kim",
    candidateEmail: "david.kim@email.com",
    jobTitle: "DevOps Engineer",
    company: "CloudScale",
    appliedDate: "2024-01-16",
    status: "Rejected",
    statusColor: "bg-red-100 text-red-700",
    aiMatchScore: 76,
    location: "Seattle, WA",
    salary: "$110k - $160k",
  },
];

// Mock data for Applied Companies
const appliedCompanies = [
  {
    id: "comp-001",
    name: "TechCorp",
    logo: "TC",
    industry: "Technology",
    size: "1000-5000",
    totalApplications: 45,
    activeApplications: 23,
    hiredCandidates: 8,
    location: "San Francisco, CA",
    lastApplication: "2024-01-20",
    avgAIMatch: 89,
  },
  {
    id: "comp-002",
    name: "InnovateLabs",
    logo: "IL",
    industry: "Technology",
    size: "200-500",
    totalApplications: 32,
    activeApplications: 18,
    hiredCandidates: 5,
    location: "New York, NY",
    lastApplication: "2024-01-18",
    avgAIMatch: 87,
  },
  {
    id: "comp-003",
    name: "DesignStudio",
    logo: "DS",
    industry: "Design",
    size: "50-200",
    totalApplications: 28,
    activeApplications: 12,
    hiredCandidates: 7,
    location: "Los Angeles, CA",
    lastApplication: "2024-01-15",
    avgAIMatch: 92,
  },
  {
    id: "comp-004",
    name: "CloudScale",
    logo: "CS",
    industry: "Cloud Services",
    size: "500-1000",
    totalApplications: 38,
    activeApplications: 20,
    hiredCandidates: 6,
    location: "Seattle, WA",
    lastApplication: "2024-01-12",
    avgAIMatch: 85,
  },
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review":
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case "Interview Scheduled":
        return <Calendar className="w-4 h-4 text-orange-500" />;
      case "Hired":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const totalUsers = generatedCVs.length;
  const totalApplications = allJobApplications.length;
  const totalCompanies = appliedCompanies.length;
  const activeJobs = appliedCompanies.reduce(
    (sum, comp) => sum + comp.activeApplications,
    0,
  );

  return (
    <DashboardLayout
      userRole="admin"
      userName="Admin"
      title="Admin Dashboard"
      subtitle="Monitor and manage the entire TalentSync platform"
    >
      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {totalUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generated CVs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {generatedCVs.length}
            </div>
            <p className="text-xs text-muted-foreground">+8 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {totalApplications}
            </div>
            <p className="text-xs text-muted-foreground">+15% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Companies
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {totalCompanies}
            </div>
            <p className="text-xs text-muted-foreground">Hiring actively</p>
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
          <TabsTrigger value="cvs">Generated CVs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent CV Generation Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent CV Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedCVs.slice(0, 4).map((cv) => (
                    <div
                      key={cv.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-orange-100 text-orange-600">
                            {cv.candidateName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {cv.candidateName}
                          </p>
                          <p className="text-xs text-gray-600">{cv.title}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">AI: {cv.aiScore}%</Badge>
                        <p className="text-xs text-gray-500">
                          {new Date(cv.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allJobApplications.slice(0, 4).map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-orange-100 text-orange-600">
                            {app.candidateName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {app.candidateName}
                          </p>
                          <p className="text-xs text-gray-600">
                            {app.jobTitle} at {app.company}
                          </p>
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
          </div>

          {/* Platform Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {Math.round(
                      generatedCVs.reduce((sum, cv) => sum + cv.aiScore, 0) /
                        generatedCVs.length,
                    )}
                    %
                  </div>
                  <div className="text-sm text-gray-600">Avg AI Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {Math.round(
                      (allJobApplications.filter(
                        (app) => app.status === "Hired",
                      ).length /
                        allJobApplications.length) *
                        100,
                    )}
                    %
                  </div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {Math.round(
                      appliedCompanies.reduce(
                        (sum, comp) => sum + comp.avgAIMatch,
                        0,
                      ) / appliedCompanies.length,
                    )}
                    %
                  </div>
                  <div className="text-sm text-gray-600">Avg Match Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cvs" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Generated CVs
              </h3>
              <p className="text-gray-600">
                Monitor all AI-generated CVs in the system
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {generatedCVs.map((cv) => (
              <Card key={cv.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          {cv.candidateName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {cv.candidateName}
                          </h4>
                          <Badge
                            variant={
                              cv.status === "Active" ? "default" : "secondary"
                            }
                            className={
                              cv.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }
                          >
                            {cv.status}
                          </Badge>
                          <Badge variant="outline">
                            AI Score: {cv.aiScore}%
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{cv.title}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Email</p>
                            <p className="font-medium">{cv.candidateEmail}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Created</p>
                            <p className="font-medium">
                              {new Date(cv.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Job Matches</p>
                            <p className="font-medium text-orange-600">
                              {cv.matchedJobs}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Applications</p>
                            <p className="font-medium">{cv.applications}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Job Applications
              </h3>
              <p className="text-gray-600">
                Monitor all job applications across the platform
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {allJobApplications.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          {app.candidateName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {app.candidateName}
                          </h4>
                          <Badge className={app.statusColor}>
                            {app.status}
                          </Badge>
                          <Badge variant="outline" className="text-orange-700">
                            {app.aiMatchScore}% Match
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">
                          Applied for:{" "}
                          <span className="font-medium">{app.jobTitle}</span> at{" "}
                          <span className="font-medium">{app.company}</span>
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
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
                            {new Date(app.appliedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            {app.candidateEmail}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(app.status)}
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Companies</h3>
              <p className="text-gray-600">
                Monitor company activity and hiring patterns
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
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
                      <p className="text-sm text-gray-600">
                        {company.industry}
                      </p>
                      <Badge variant="outline" className="mt-1">
                        {company.avgAIMatch}% Avg Match
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium">{company.location}</p>
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
                    <div>
                      <p className="text-gray-600">Hired</p>
                      <p className="font-medium text-green-600">
                        {company.hiredCandidates}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Success Rate</p>
                      <p className="font-medium">
                        {Math.round(
                          (company.hiredCandidates /
                            company.totalApplications) *
                            100,
                        )}
                        %
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Last activity:{" "}
                    {new Date(company.lastApplication).toLocaleDateString()}
                  </div>
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreVertical className="w-4 h-4" />
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
