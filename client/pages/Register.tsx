import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Briefcase, Eye, EyeOff, Check } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [jobseekerData, setJobseekerData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    skills: "",
  });
  const [employerData, setEmployerData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companySize: "",
    industry: "",
  });

  const handleJobseekerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Jobseeker registration:", jobseekerData);
  };

  const handleEmployerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employer registration:", employerData);
  };

  const benefits = [
    "AI-powered job matching",
    "Direct access to top employers",
    "Real-time application tracking",
    "Personalized career insights",
    "Free resume analysis",
    "Interview preparation tools",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4">
      <div className="w-full max-w-4xl flex gap-8">
        {/* Benefits Section */}
        <div className="hidden lg:flex flex-col justify-center w-1/2 pr-8">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                TalentSync
              </span>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Join the Future of Recruitment
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Connect with opportunities that match your ambitions and build
              your career with AI-powered precision.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="w-full lg:w-1/2">
          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Create Your Account
              </CardTitle>
              <p className="text-center text-gray-600">
                Choose your account type to get started
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="jobseeker" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="jobseeker">Job Seeker</TabsTrigger>
                  <TabsTrigger value="employer">Employer</TabsTrigger>
                </TabsList>

                <TabsContent value="jobseeker">
                  <form onSubmit={handleJobseekerSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={jobseekerData.fullName}
                        onChange={(e) =>
                          setJobseekerData({
                            ...jobseekerData,
                            fullName: e.target.value,
                          })
                        }
                        className="h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-jobseeker">Email</Label>
                      <Input
                        id="email-jobseeker"
                        type="email"
                        placeholder="Enter your email address"
                        value={jobseekerData.email}
                        onChange={(e) =>
                          setJobseekerData({
                            ...jobseekerData,
                            email: e.target.value,
                          })
                        }
                        className="h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience Level</Label>
                      <Select
                        value={jobseekerData.experience}
                        onValueChange={(value) =>
                          setJobseekerData({
                            ...jobseekerData,
                            experience: value,
                          })
                        }
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">
                            Entry Level (0-2 years)
                          </SelectItem>
                          <SelectItem value="mid">
                            Mid Level (3-5 years)
                          </SelectItem>
                          <SelectItem value="senior">
                            Senior Level (6-10 years)
                          </SelectItem>
                          <SelectItem value="executive">
                            Executive (10+ years)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Key Skills</Label>
                      <Input
                        id="skills"
                        type="text"
                        placeholder="e.g., React, JavaScript, Python..."
                        value={jobseekerData.skills}
                        onChange={(e) =>
                          setJobseekerData({
                            ...jobseekerData,
                            skills: e.target.value,
                          })
                        }
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password-jobseeker">Password</Label>
                      <div className="relative">
                        <Input
                          id="password-jobseeker"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={jobseekerData.password}
                          onChange={(e) =>
                            setJobseekerData({
                              ...jobseekerData,
                              password: e.target.value,
                            })
                          }
                          className="h-11 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword-jobseeker">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword-jobseeker"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={jobseekerData.confirmPassword}
                          onChange={(e) =>
                            setJobseekerData({
                              ...jobseekerData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="h-11 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="terms-jobseeker"
                        className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        required
                      />
                      <label
                        htmlFor="terms-jobseeker"
                        className="text-sm text-gray-600"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-orange-600 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-orange-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold"
                    >
                      Create Job Seeker Account
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="employer">
                  <form onSubmit={handleEmployerSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        type="text"
                        placeholder="Enter your company name"
                        value={employerData.companyName}
                        onChange={(e) =>
                          setEmployerData({
                            ...employerData,
                            companyName: e.target.value,
                          })
                        }
                        className="h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-employer">Company Email</Label>
                      <Input
                        id="email-employer"
                        type="email"
                        placeholder="Enter your company email"
                        value={employerData.email}
                        onChange={(e) =>
                          setEmployerData({
                            ...employerData,
                            email: e.target.value,
                          })
                        }
                        className="h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select
                        value={employerData.companySize}
                        onValueChange={(value) =>
                          setEmployerData({
                            ...employerData,
                            companySize: value,
                          })
                        }
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">
                            51-200 employees
                          </SelectItem>
                          <SelectItem value="201-1000">
                            201-1000 employees
                          </SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        value={employerData.industry}
                        onValueChange={(value) =>
                          setEmployerData({ ...employerData, industry: value })
                        }
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">
                            Manufacturing
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password-employer">Password</Label>
                      <div className="relative">
                        <Input
                          id="password-employer"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={employerData.password}
                          onChange={(e) =>
                            setEmployerData({
                              ...employerData,
                              password: e.target.value,
                            })
                          }
                          className="h-11 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword-employer">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword-employer"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={employerData.confirmPassword}
                          onChange={(e) =>
                            setEmployerData({
                              ...employerData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="h-11 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="terms-employer"
                        className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        required
                      />
                      <label
                        htmlFor="terms-employer"
                        className="text-sm text-gray-600"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-orange-600 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-orange-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold"
                    >
                      Create Employer Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-orange-600 hover:text-orange-700 font-semibold hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
