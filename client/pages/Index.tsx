import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../components/ui/navigation";
import { JobCard } from "../components/ui/job-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Target,
  ChevronRight,
  Star,
  Building,
} from "lucide-react";

// Mock data for featured jobs
const featuredJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time" as const,
    salary: "$120k - $180k",
    description:
      "Join our team to build cutting-edge web applications using React, TypeScript, and modern tools. We're looking for someone passionate about creating exceptional user experiences.",
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS", "GraphQL"],
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "InnovateLabs",
    location: "Remote",
    type: "Remote" as const,
    salary: "$100k - $150k",
    description:
      "Lead product strategy and development for our AI-powered recruitment platform. Work with cross-functional teams to deliver innovative solutions.",
    skills: [
      "Product Management",
      "Agile",
      "Data Analysis",
      "User Research",
      "SQL",
    ],
    postedAt: "1 day ago",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "New York, NY",
    type: "Full-time" as const,
    salary: "$110k - $160k",
    description:
      "Build and maintain scalable infrastructure for our growing platform. Experience with AWS, Kubernetes, and CI/CD pipelines required.",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "Jenkins"],
    postedAt: "3 days ago",
  },
];

const companies = [
  { name: "Google", logo: "G", employees: "100k+" },
  { name: "Microsoft", logo: "M", employees: "200k+" },
  { name: "Amazon", logo: "A", employees: "1.5M+" },
  { name: "Apple", logo: "A", employees: "150k+" },
  { name: "Meta", logo: "F", employees: "80k+" },
  { name: "Netflix", logo: "N", employees: "15k+" },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Career Match
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with top employers and discover opportunities that align
              with your skills and aspirations. Our AI-powered platform makes
              job searching smarter and more efficient.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Location or remote"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="pl-12 h-12 text-base border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                  />
                </div>
                <div className="flex space-x-4">
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-base font-semibold"
                  >
                    Search Jobs
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 border-orange-300 text-orange-600 hover:bg-orange-50"
                    asChild
                  >
                    <Link to="/cv-analysis">
                      <Zap className="w-5 h-5 mr-2" />
                      Analyze CV
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-600">50k+</div>
                <div className="text-gray-600">Active Jobs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">15k+</div>
                <div className="text-gray-600">Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">2M+</div>
                <div className="text-gray-600">Job Seekers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">98%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Jobs
              </h2>
              <p className="text-gray-600">
                Discover hand-picked opportunities from top companies
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/jobs">
                View All Jobs
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Companies
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals who found their dream jobs through
              our platform
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {companies.map((company, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                    {company.logo}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {company.employees} employees
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose TalentSync?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform revolutionizes the way you find and apply
              for jobs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">AI-Powered Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our intelligent algorithm matches you with jobs that perfectly
                  fit your skills and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Verified Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All companies on our platform are thoroughly verified to
                  ensure legitimate opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">
                  Personalized Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get job recommendations tailored to your career goals and
                  experience level.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Career Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access career insights, salary data, and growth opportunities
                  in your field.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join millions of professionals who have found their perfect job
            through TalentSync
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold"
              asChild
            >
              <Link to="/register">Get Started as Job Seeker</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg font-semibold"
              asChild
            >
              <Link to="/employer-register">Post a Job</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TalentSync</span>
              </div>
              <p className="text-gray-400">
                Connecting talent with opportunity through intelligent matching
                and seamless experiences.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-white transition-colors"
                  >
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/companies"
                    className="hover:text-white transition-colors"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career-advice"
                    className="hover:text-white transition-colors"
                  >
                    Career Advice
                  </Link>
                </li>
                <li>
                  <Link
                    to="/salary-guide"
                    className="hover:text-white transition-colors"
                  >
                    Salary Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/post-job"
                    className="hover:text-white transition-colors"
                  >
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/talent-solutions"
                    className="hover:text-white transition-colors"
                  >
                    Talent Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recruiting-tips"
                    className="hover:text-white transition-colors"
                  >
                    Recruiting Tips
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TalentSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
