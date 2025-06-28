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
  Briefcase,
  Users,
  Eye,
  Calendar,
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
  Phone,
  Mail,
  Star,
  Download,
  MessageCircle,
} from "lucide-react";

// Mock data
const postedJobs = [
  {
    id: "job-001",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    postedDate: "2024-01-15",
    status: "Active",
    applications: 24,
    views: 156,
    shortlisted: 8,
    interviewed: 3,
    description: "Looking for experienced React developer to join our team...",
  },
  {
    id: "job-002",
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $150k",
    postedDate: "2024-01-12",
    status: "Active",
    applications: 45,
    views: 289,
    shortlisted: 12,
    interviewed: 5,
    description: "Drive product strategy and development...",
  },
  {
    id: "job-003",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110k - $160k",
    postedDate: "2024-01-10",
    status: "Draft",
    applications: 0,
    views: 0,
    shortlisted: 0,
    interviewed: 0,
    description: "Build and maintain scalable infrastructure...",
  },
];

const jobApplications = [
  {
    id: "app-001",
    candidateName: "Sarah Johnson",
    candidateEmail: "sarah.johnson@email.com",
    candidatePhone: "+1 (555) 123-4567",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2024-01-20",
    status: "Under Review",
    statusColor: "bg-blue-100 text-blue-700",
    experience: "5+ years",
    skills: ["React", "TypeScript", "Node.js", "Python"],
    aiMatchScore: 94,
    cvScore: 92,
    lastActive: "2024-01-22",
    notes: "Strong technical background, excellent React experience",
    interviewDate: null,
    avatar: "SJ",
  },
  {
    id: "app-002",
    candidateName: "Michael Chen",
    candidateEmail: "michael.chen@email.com",
    candidatePhone: "+1 (555) 234-5678",
    jobTitle: "Product Manager",
    appliedDate: "2024-01-18",
    status: "Interview Scheduled",
    statusColor: "bg-orange-100 text-orange-700",
    experience: "7+ years",
    skills: ["Product Strategy", "Analytics", "Agile", "SQL"],
    aiMatchScore: 89,
    cvScore: 87,
    lastActive: "2024-01-21",
    notes: "Great product sense, strong analytical skills",
    interviewDate: "2024-01-25",
    avatar: "MC",
  },
  {
    id: "app-003",
    candidateName: "Emily Rodriguez",
    candidateEmail: "emily.rodriguez@email.com",
    candidatePhone: "+1 (555) 345-6789",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2024-01-17",
    status: "Shortlisted",
    statusColor: "bg-purple-100 text-purple-700",
    experience: "6+ years",
    skills: ["React", "Vue.js", "GraphQL", "AWS"],
    aiMatchScore: 91,
    cvScore: 89,
    lastActive: "2024-01-23",
    notes: "Impressive portfolio, strong frontend skills",
    interviewDate: null,
    avatar: "ER",
  },
  {
    id: "app-004",
    candidateName: "David Kim",
    candidateEmail: "david.kim@email.com",
    candidatePhone: "+1 (555) 456-7890",
    jobTitle: "DevOps Engineer",
    appliedDate: "2024-01-16",
    status: "Rejected",
    statusColor: "bg-red-100 text-red-700",
    experience: "3+ years",
    skills: ["Docker", "Kubernetes", "AWS", "Terraform"],
    aiMatchScore: 76,
    cvScore: 73,
    lastActive: "2024-01-20",
    notes: "Good technical skills but lacks senior experience",
    interviewDate: null,
    avatar: "DK",
  },
  {
    id: "app-005",
    candidateName: "Lisa Wang",
    candidateEmail: "lisa.wang@email.com",
    candidatePhone: "+1 (555) 567-8901",
    jobTitle: "Product Manager",
    appliedDate: "2024-01-14",
    status: "Hired",
    statusColor: "bg-green-100 text-green-700",
    experience: "8+ years",
    skills: [
      "Product Management",
      "User Research",
      "Data Analysis",
      "Leadership",
    ],
    aiMatchScore: 96,
    cvScore: 94,
    lastActive: "2024-01-24",
    notes: "Excellent candidate, perfect fit for our team culture",
    interviewDate: null,
    avatar: "LW",
  },
];

export default function EmployerDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedApplication, setSelectedApplication] = useState<string | null>(
    null,
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review":
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case "Interview Scheduled":
        return <Calendar className="w-4 h-4 text-orange-500" />;
      case "Shortlisted":
        return <Star className="w-4 h-4 text-purple-500" />;
      case "Hired":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleContactCandidate = (candidateEmail: string) => {
    window.open(`mailto:${candidateEmail}`, "_blank");
  };

  const handleCallCandidate = (candidatePhone: string) => {
    window.open(`tel:${candidatePhone}`, "_blank");
  };

  const handleUpdateStatus = (applicationId: string, newStatus: string) => {
    console.log(`Updating application ${applicationId} to ${newStatus}`);
    // Implementation for status update
  };

  return (
    <DashboardLayout
      userRole="employer"
      userName="TechCorp"
      title="Employer Dashboard"
      subtitle="Manage your job postings and review candidates"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {postedJobs.filter((job) => job.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">+1 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {jobApplications.length}
            </div>
            <p className="text-xs text-muted-foreground">+8 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {
                jobApplications.filter((app) => app.status === "Shortlisted")
                  .length
              }
            </div>
            <p className="text-xs text-muted-foreground">Ready for interview</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {jobApplications.filter((app) => app.status === "Hired").length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
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
                  {jobApplications.slice(0, 4).map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-orange-100 text-orange-600">
                            {app.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {app.candidateName}
                          </p>
                          <p className="text-xs text-gray-600">
                            {app.jobTitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="text-xs">
                          {app.aiMatchScore}% match
                        </Badge>
                        <Badge className={app.statusColor}>{app.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {postedJobs
                    .filter((job) => job.status === "Active")
                    .sort((a, b) => b.applications - a.applications)
                    .slice(0, 3)
                    .map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{job.title}</p>
                          <p className="text-xs text-gray-600">
                            {job.department}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-orange-600">
                            {job.applications} applications
                          </p>
                          <p className="text-xs text-gray-600">
                            {job.views} views
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Posted Jobs
              </h3>
              <p className="text-gray-600">
                Manage and track your job postings
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </div>

          <div className="space-y-4">
            {postedJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {job.title}
                        </h4>
                        <Badge
                          variant={
                            job.status === "Active" ? "default" : "secondary"
                          }
                          className={
                            job.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Posted:{" "}
                          {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Eye className="w-4 h-4 mr-2" />
                          {job.views} views
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-xl font-bold text-orange-600">
                        {job.applications}
                      </div>
                      <div className="text-xs text-gray-600">Applications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600">
                        {job.shortlisted}
                      </div>
                      <div className="text-xs text-gray-600">Shortlisted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">
                        {job.interviewed}
                      </div>
                      <div className="text-xs text-gray-600">Interviewed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">
                        {job.views}
                      </div>
                      <div className="text-xs text-gray-600">Views</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Job
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      {job.status === "Active" && (
                        <Button size="sm" variant="outline">
                          Pause
                        </Button>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">
                        View Candidates ({job.applications})
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Job Applications
            </h3>
            <p className="text-gray-600">
              Review and manage candidate applications
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
                          {app.avatar}
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
                            {app.aiMatchScore}% AI Match
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">
                          Applied for: {app.jobTitle}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            {app.candidateEmail}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            {app.candidatePhone}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            Applied:{" "}
                            {new Date(app.appliedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            Experience: {app.experience}
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            Skills:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {app.skills.map((skill, index) => (
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

                        {app.notes && (
                          <div className="p-3 bg-gray-50 rounded-lg mb-3">
                            <p className="text-sm text-gray-700">{app.notes}</p>
                          </div>
                        )}

                        {app.interviewDate && (
                          <div className="p-3 bg-orange-50 rounded-lg mb-3">
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
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleContactCandidate(app.candidateEmail)
                        }
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCallCandidate(app.candidatePhone)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        CV
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      {app.status === "Under Review" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleUpdateStatus(app.id, "Shortlisted")
                            }
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Shortlist
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(app.id, "Interview Scheduled")
                            }
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Interview
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleUpdateStatus(app.id, "Rejected")
                            }
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}

                      {app.status === "Shortlisted" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(app.id, "Interview Scheduled")
                            }
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Interview
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleUpdateStatus(app.id, "Rejected")
                            }
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}

                      {app.status === "Interview Scheduled" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(app.id, "Hired")}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Hire
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleUpdateStatus(app.id, "Rejected")
                            }
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
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
