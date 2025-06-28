import { useState } from "react";
import { DashboardLayout } from "../components/ui/dashboard-layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Edit,
  Save,
  Camera,
  Award,
  Link as LinkIcon,
} from "lucide-react";

export default function CandidateProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    summary:
      "Experienced frontend developer with 5+ years of expertise in React, TypeScript, and modern web technologies. Passionate about creating exceptional user experiences and leading cross-functional teams.",
    experience: "5+ years",
    currentCompany: "TechCorp Inc.",
    education: "B.S. Computer Science - UC Berkeley",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  });

  const skills = [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "HTML/CSS",
    "Git",
    "AWS",
    "Docker",
    "GraphQL",
    "Jest",
    "Next.js",
  ];

  const achievements = [
    {
      title: "Top Performer Award",
      organization: "TechCorp Inc.",
      date: "2023",
      description: "Recognized for outstanding performance and leadership",
    },
    {
      title: "React Certification",
      organization: "Meta",
      date: "2022",
      description: "Advanced React concepts and best practices",
    },
    {
      title: "AWS Solutions Architect",
      organization: "Amazon",
      date: "2021",
      description: "Cloud architecture and deployment expertise",
    },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data logic here
    console.log("Saving profile:", profileData);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout
      userRole="candidate"
      userName="John Doe"
      title="Profile"
      subtitle="Quản lý thông tin cá nhân và trình độ chuyên môn"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" alt={profileData.fullName} />
                  <AvatarFallback className="bg-orange-100 text-orange-600 text-2xl font-bold">
                    {profileData.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          value={profileData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          className="text-2xl font-bold"
                        />
                        <Input
                          value={profileData.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          className="text-lg"
                        />
                      </div>
                    ) : (
                      <>
                        <h1 className="text-2xl font-bold text-gray-900">
                          {profileData.fullName}
                        </h1>
                        <p className="text-lg text-gray-600">
                          {profileData.title}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" />
                          Lưu
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Hủy
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Chỉnh sửa
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {isEditing ? (
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="text-sm"
                      />
                    ) : (
                      profileData.email
                    )}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {isEditing ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="text-sm"
                      />
                    ) : (
                      profileData.phone
                    )}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {isEditing ? (
                      <Input
                        value={profileData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className="text-sm"
                      />
                    ) : (
                      profileData.location
                    )}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {isEditing ? (
                      <Input
                        value={profileData.currentCompany}
                        onChange={(e) =>
                          handleInputChange("currentCompany", e.target.value)
                        }
                        className="text-sm"
                      />
                    ) : (
                      profileData.currentCompany
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-orange-600" />
              Giới thiệu bản thân
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={profileData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                rows={4}
                className="w-full"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {profileData.summary}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-orange-600" />
              Kỹ năng chuyên môn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <Button variant="outline" className="mt-3">
                <Award className="w-4 h-4 mr-2" />
                Thêm kỹ năng
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Work Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-orange-600" />
                Kinh nghiệm làm việc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Senior Frontend Developer
                  </h4>
                  <p className="text-gray-600">TechCorp Inc.</p>
                  <p className="text-sm text-gray-500">2021 - Present</p>
                  <p className="text-sm text-gray-700 mt-2">
                    Lead development of React-based applications, mentored
                    junior developers, and improved performance by 40%.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Frontend Developer
                  </h4>
                  <p className="text-gray-600">StartupXYZ</p>
                  <p className="text-sm text-gray-500">2019 - 2021</p>
                  <p className="text-sm text-gray-700 mt-2">
                    Built responsive web applications using React and
                    TypeScript.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-orange-600" />
                Học vấn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    B.S. Computer Science
                  </h4>
                  <p className="text-gray-600">
                    University of California, Berkeley
                  </p>
                  <p className="text-sm text-gray-500">2015 - 2019</p>
                  <p className="text-sm text-gray-700 mt-2">
                    Graduated Summa Cum Laude, GPA: 3.8/4.0
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-orange-600" />
              Thành tích & Chứng chỉ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="border-l-4 border-orange-200 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600">
                        {achievement.organization}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {achievement.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-orange-700">
                      {achievement.date}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LinkIcon className="w-5 h-5 mr-2 text-orange-600" />
              Liên kết mạng xã hội
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Website</Label>
                {isEditing ? (
                  <Input
                    value={profileData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="mt-1"
                  />
                ) : (
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-1 text-orange-600 hover:underline"
                  >
                    {profileData.website}
                  </a>
                )}
              </div>
              <div>
                <Label>LinkedIn</Label>
                {isEditing ? (
                  <Input
                    value={profileData.linkedin}
                    onChange={(e) =>
                      handleInputChange("linkedin", e.target.value)
                    }
                    className="mt-1"
                  />
                ) : (
                  <a
                    href={profileData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-1 text-orange-600 hover:underline"
                  >
                    {profileData.linkedin}
                  </a>
                )}
              </div>
              <div>
                <Label>GitHub</Label>
                {isEditing ? (
                  <Input
                    value={profileData.github}
                    onChange={(e) =>
                      handleInputChange("github", e.target.value)
                    }
                    className="mt-1"
                  />
                ) : (
                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-1 text-orange-600 hover:underline"
                  >
                    {profileData.github}
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
