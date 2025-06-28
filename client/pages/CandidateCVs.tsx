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
import {
  FileText,
  Eye,
  Download,
  Trash,
  Plus,
  Calendar,
  Target,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

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
    applications: 5,
    description: "Optimized for React and TypeScript positions",
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
    applications: 2,
    description: "Focus on MERN stack development",
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
    applications: 8,
    description: "Specialized in modern React ecosystem",
  },
];

export default function CandidateCVs() {
  const [cvs, setCvs] = useState(generatedCVs);

  const handleDelete = (cvId: string) => {
    setCvs(cvs.filter((cv) => cv.id !== cvId));
  };

  const handleViewResults = (cvId: string) => {
    console.log("View results for CV:", cvId);
    // Navigate to CV analysis results
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      case "Archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "Draft":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "Archived":
        return <FileText className="w-4 h-4 text-gray-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout
      userRole="candidate"
      userName="John Doe"
      title="CV đã Generate"
      subtitle="Quản lý các CV đã tạo bằng AI và theo dõi hiệu suất"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng CV</p>
                <p className="text-2xl font-bold text-gray-900">{cvs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">CV Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {cvs.filter((cv) => cv.status === "Active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Job Matches</p>
                <p className="text-2xl font-bold text-gray-900">
                  {cvs.reduce((sum, cv) => sum + cv.matchedJobs, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {cvs.reduce((sum, cv) => sum + cv.views, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Danh sách CV</h2>
          <p className="text-gray-600">Xem và quản lý tất cả CV đã tạo</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Tạo CV mới
        </Button>
      </div>

      {/* CV List */}
      <div className="space-y-6">
        {cvs.map((cv) => (
          <Card key={cv.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{cv.title}</CardTitle>
                      <Badge className={getStatusColor(cv.status)}>
                        {cv.status}
                      </Badge>
                      <Badge variant="outline">AI Score: {cv.aiScore}%</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {cv.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Tạo: {new Date(cv.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Cập nhật:{" "}
                        {new Date(cv.lastUpdated).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Target className="w-4 h-4 mr-2" />
                        Matches: {cv.matchedJobs}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Eye className="w-4 h-4 mr-2" />
                        Views: {cv.views}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(cv.status)}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">
                    {cv.views}
                  </div>
                  <div className="text-xs text-gray-600">Lượt xem</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {cv.downloads}
                  </div>
                  <div className="text-xs text-gray-600">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {cv.applications}
                  </div>
                  <div className="text-xs text-gray-600">Ứng tuyển</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <Button
                    size="sm"
                    onClick={() => handleViewResults(cv.id)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Xem kết quả
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(cv.id)}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Xóa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {cvs.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Chưa có CV nào
            </h3>
            <p className="text-gray-600 mb-4">
              Bạn chưa tạo CV nào. Hãy bắt đầu tạo CV đầu tiên!
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tạo CV đầu tiên
            </Button>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
