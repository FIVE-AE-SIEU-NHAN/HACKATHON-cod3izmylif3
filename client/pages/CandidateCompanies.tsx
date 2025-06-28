import { DashboardLayout } from "../components/ui/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Building,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

const appliedCompanies = [
  {
    id: "comp-001",
    name: "TechCorp",
    logo: "TC",
    industry: "Technology",
    size: "1000-5000",
    location: "San Francisco, CA",
    totalApplications: 3,
    applications: [
      {
        id: "app-001",
        jobTitle: "Senior Frontend Developer",
        appliedDate: "2024-01-20",
        status: "Under Review",
        statusColor: "bg-blue-100 text-blue-700",
        cvUsed: "Senior Frontend Developer CV",
      },
      {
        id: "app-002",
        jobTitle: "React Developer",
        appliedDate: "2024-01-15",
        status: "Interview Scheduled",
        statusColor: "bg-orange-100 text-orange-700",
        cvUsed: "React Developer CV",
      },
      {
        id: "app-003",
        jobTitle: "Frontend Engineer",
        appliedDate: "2024-01-10",
        status: "Accepted",
        statusColor: "bg-green-100 text-green-700",
        cvUsed: "Frontend Developer CV",
      },
    ],
    lastApplication: "2024-01-20",
    relationshipStatus: "Active Candidate",
  },
  {
    id: "comp-002",
    name: "InnovateLabs",
    logo: "IL",
    industry: "Technology",
    size: "200-500",
    location: "New York, NY",
    totalApplications: 2,
    applications: [
      {
        id: "app-004",
        jobTitle: "Product Manager",
        appliedDate: "2024-01-18",
        status: "Under Review",
        statusColor: "bg-blue-100 text-blue-700",
        cvUsed: "Product Manager CV",
      },
      {
        id: "app-005",
        jobTitle: "Full Stack Developer",
        appliedDate: "2024-01-12",
        status: "Rejected",
        statusColor: "bg-red-100 text-red-700",
        cvUsed: "Full Stack Developer CV",
      },
    ],
    lastApplication: "2024-01-18",
    relationshipStatus: "Under Review",
  },
  {
    id: "comp-003",
    name: "DesignStudio",
    logo: "DS",
    industry: "Design",
    size: "50-200",
    location: "Los Angeles, CA",
    totalApplications: 1,
    applications: [
      {
        id: "app-006",
        jobTitle: "UI/UX Designer",
        appliedDate: "2024-01-15",
        status: "Hired",
        statusColor: "bg-green-100 text-green-700",
        cvUsed: "UI/UX Designer CV",
      },
    ],
    lastApplication: "2024-01-15",
    relationshipStatus: "Hired",
  },
];

export default function CandidateCompanies() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review":
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case "Interview Scheduled":
        return <Calendar className="w-4 h-4 text-orange-500" />;
      case "Accepted":
      case "Hired":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRelationshipBadgeColor = (status: string) => {
    switch (status) {
      case "Hired":
        return "bg-green-100 text-green-700";
      case "Active Candidate":
        return "bg-orange-100 text-orange-700";
      case "Under Review":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const totalApplications = appliedCompanies.reduce(
    (sum, comp) => sum + comp.totalApplications,
    0,
  );
  const activeApplications = appliedCompanies.reduce(
    (sum, comp) =>
      sum +
      comp.applications.filter(
        (app) =>
          app.status === "Under Review" || app.status === "Interview Scheduled",
      ).length,
    0,
  );
  const hiredCount = appliedCompanies.reduce(
    (sum, comp) =>
      sum +
      comp.applications.filter(
        (app) => app.status === "Hired" || app.status === "Accepted",
      ).length,
    0,
  );

  return (
    <DashboardLayout
      userRole="candidate"
      userName="John Doe"
      title="Công ty đã ứng tuyển"
      subtitle="Theo dõi trạng thái ứng tuyển tại các công ty"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Tổng công ty
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {appliedCompanies.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng đơn</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalApplications}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeApplications}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Đã nhận</p>
                <p className="text-2xl font-bold text-gray-900">{hiredCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companies List */}
      <div className="space-y-6">
        {appliedCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-orange-100 text-orange-600 text-xl font-bold">
                      {company.logo}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl">{company.name}</CardTitle>
                      <Badge
                        className={getRelationshipBadgeColor(
                          company.relationshipStatus,
                        )}
                      >
                        {company.relationshipStatus}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        {company.industry}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {company.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Lần cuối:{" "}
                        {new Date(company.lastApplication).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-600">
                    {company.totalApplications}
                  </div>
                  <div className="text-sm text-gray-600">Đơn ứng tuyển</div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-3">
                Danh sách ứng tuyển:
              </h4>
              <div className="space-y-3">
                {company.applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(app.status)}
                        <div>
                          <p className="font-medium text-sm text-gray-900">
                            {app.jobTitle}
                          </p>
                          <p className="text-xs text-gray-600">
                            CV: {app.cvUsed}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-xs text-gray-600">
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={app.statusColor}>{app.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {appliedCompanies.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Chưa ứng tuyển công ty nào
            </h3>
            <p className="text-gray-600 mb-4">
              Bạn chưa ứng tuyển vào công ty nào. Hãy bắt đầu tìm kiếm việc làm!
            </p>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
