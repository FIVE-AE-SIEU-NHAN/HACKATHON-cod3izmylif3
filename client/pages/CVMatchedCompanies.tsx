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
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import {
  ArrowLeft,
  Target,
  Star,
  Users,
  MapPin,
  Building,
  TrendingUp,
  ExternalLink,
  Heart,
  Briefcase,
  Calendar,
  DollarSign,
  CheckCircle,
  Sparkles,
  Filter,
} from "lucide-react";

const matchedCompanies = [
  {
    id: "1",
    name: "TechCorp",
    logo: "TC",
    industry: "Technology",
    size: "1000-5000",
    location: "San Francisco, CA",
    description:
      "Leading technology company focused on innovative software solutions and AI-powered products. Perfect match for React developers.",
    match: 94,
    whyMatch: [
      "Strong React team culture",
      "TypeScript-first development",
      "Senior developer mentorship",
      "Remote-friendly environment",
    ],
    openJobs: 8,
    targetJobs: [
      "Senior Frontend Developer",
      "React Developer",
      "Tech Lead - Frontend",
    ],
    rating: 4.8,
    reviews: 342,
    salaryRange: "$120k - $180k",
    benefits: ["Health Insurance", "401k", "Remote Work", "Stock Options"],
    recentHires: "Hired 12 React developers this month",
    culture: ["Innovation", "Work-life balance", "Growth mindset"],
  },
  {
    id: "2",
    name: "InnovateLabs",
    logo: "IL",
    industry: "Technology",
    size: "200-500",
    location: "New York, NY",
    description:
      "Cutting-edge research and development company specializing in emerging technologies and React-based solutions.",
    match: 91,
    whyMatch: [
      "React-focused projects",
      "Innovation-driven culture",
      "Cross-functional collaboration",
      "Continuous learning environment",
    ],
    openJobs: 5,
    targetJobs: ["Frontend Developer", "Full Stack Developer", "UI Engineer"],
    rating: 4.6,
    reviews: 128,
    salaryRange: "$100k - $150k",
    benefits: ["Flexible Hours", "Learning Budget", "Health Coverage"],
    recentHires: "Actively hiring React developers",
    culture: ["Fast-paced", "Learning-focused", "Collaborative"],
  },
  {
    id: "3",
    name: "DesignStudio",
    logo: "DS",
    industry: "Design",
    size: "50-200",
    location: "Los Angeles, CA",
    description:
      "Award-winning design agency creating beautiful digital experiences with modern frontend technologies.",
    match: 87,
    whyMatch: [
      "Design-development collaboration",
      "Modern frontend stack",
      "Creative projects",
      "Portfolio-building opportunities",
    ],
    openJobs: 3,
    targetJobs: ["Frontend Developer", "UI Developer", "Creative Developer"],
    rating: 4.9,
    reviews: 89,
    salaryRange: "$90k - $130k",
    benefits: ["Creative Freedom", "Design Tools", "Flexible PTO"],
    recentHires: "Looking for frontend talent",
    culture: ["Creative freedom", "Client-focused", "Work-life balance"],
  },
  {
    id: "4",
    name: "CloudScale",
    logo: "CS",
    industry: "Cloud Services",
    size: "500-1000",
    location: "Seattle, WA",
    description:
      "Cloud infrastructure company building developer tools and dashboards with React and TypeScript.",
    match: 85,
    whyMatch: [
      "Developer-focused products",
      "TypeScript ecosystem",
      "Technical challenges",
      "Engineering excellence",
    ],
    openJobs: 6,
    targetJobs: ["Frontend Developer", "React Developer", "DevOps Engineer"],
    rating: 4.7,
    reviews: 256,
    salaryRange: "$110k - $160k",
    benefits: ["Stock Options", "Tech Budget", "Conference Attendance"],
    recentHires: "Expanding frontend team",
    culture: ["Technical excellence", "Growth mindset", "Diversity"],
  },
];

export default function CVMatchedCompanies() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleFavorite = (companyId: string) => {
    setFavorites((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId],
    );
  };

  const viewJobs = (companyName: string) => {
    navigate(`/jobs?company=${encodeURIComponent(companyName)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 mb-6"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Analysis
            </Button>

            {/* Header Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">
                      Your Perfect Company Matches
                    </h1>
                    <p className="text-orange-100">
                      Based on Sarah Johnson's CV Analysis
                    </p>
                  </div>
                </div>
                <p className="text-lg text-orange-100 mb-6">
                  We've found {matchedCompanies.length} companies that perfectly
                  match your React and TypeScript expertise. These companies are
                  actively hiring and align with your career goals.
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Your Profile Match
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Skills Alignment</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <Progress value={92} className="h-2 bg-white/20" />
                  <div className="flex justify-between items-center">
                    <span>Experience Level</span>
                    <span className="font-semibold">Senior (5+ years)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Location Preference</span>
                    <span className="font-semibold">Bay Area + Remote</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {matchedCompanies.length}
              </div>
              <div className="text-gray-600">Perfect Matches</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {matchedCompanies.reduce((sum, c) => sum + c.openJobs, 0)}
              </div>
              <div className="text-gray-600">Open Positions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">94%</div>
              <div className="text-gray-600">Highest Match</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                $125k
              </div>
              <div className="text-gray-600">Average Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies List */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Companies Matched to Your Profile
              </h2>
              <p className="text-gray-600">
                Sorted by compatibility score and hiring activity
              </p>
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Refine Matches
            </Button>
          </div>

          <div className="space-y-6">
            {matchedCompanies.map((company, index) => (
              <Card
                key={company.id}
                className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="" alt={company.name} />
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xl font-bold">
                          {company.logo}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {company.name}
                          </h3>
                          <Badge className="bg-green-100 text-green-700 font-semibold">
                            {company.match}% Match
                          </Badge>
                          {index === 0 && (
                            <Badge className="bg-orange-100 text-orange-700">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Top Match
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-1" />
                            {company.industry}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {company.size} employees
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {company.location}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                            {company.rating} ({company.reviews} reviews)
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {company.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(company.id)}
                      className={`${favorites.includes(company.id) ? "text-red-500" : "text-gray-400"}`}
                    >
                      <Heart
                        className={`w-5 h-5 ${favorites.includes(company.id) ? "fill-current" : ""}`}
                      />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Why It's a Match */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Why You're a Perfect Match
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {company.whyMatch.map((reason, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                          {reason}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Job Opportunities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-orange-500" />
                        Open Positions for You ({company.openJobs})
                      </h4>
                      <div className="space-y-2">
                        {company.targetJobs.map((job, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <span className="text-sm font-medium text-gray-800">
                              {job}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => viewJobs(company.name)}
                            >
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                        Compensation & Benefits
                      </h4>
                      <div className="space-y-2">
                        <div className="text-lg font-semibold text-green-600">
                          {company.salaryRange}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {company.benefits.map((benefit, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs border-green-200 text-green-700"
                            >
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {company.recentHires}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Company Culture */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Company Culture
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {company.culture.map((value, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-orange-200 text-orange-700"
                        >
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Button
                      onClick={() => viewJobs(company.name)}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      View {company.openJobs} Open Positions
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Company Profile
                    </Button>
                    <Button variant="outline">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Salary Insights
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next Steps */}
          <Card className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Ready to Take the Next Step?
                </h3>
                <p className="text-gray-700 mb-6">
                  These companies are actively hiring for roles that match your
                  profile. Don't wait - the best opportunities move fast!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => navigate("/jobs")}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    Apply to Jobs Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/cv-analysis")}
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    Analyze Another CV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
