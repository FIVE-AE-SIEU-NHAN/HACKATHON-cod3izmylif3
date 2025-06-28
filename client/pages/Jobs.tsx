import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  Briefcase,
  Clock,
  DollarSign,
} from "lucide-react";

const allJobs = [
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
  {
    id: "4",
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "Los Angeles, CA",
    type: "Full-time" as const,
    salary: "$90k - $130k",
    description:
      "Create beautiful and intuitive user experiences for our suite of productivity tools. Collaborate with product and engineering teams.",
    skills: [
      "Figma",
      "Adobe XD",
      "User Research",
      "Prototyping",
      "Design Systems",
    ],
    postedAt: "1 day ago",
  },
  {
    id: "5",
    title: "Backend Developer",
    company: "DataFlow",
    location: "Seattle, WA",
    type: "Full-time" as const,
    salary: "$105k - $145k",
    description:
      "Build robust APIs and microservices for our data processing platform. Experience with Python, PostgreSQL, and distributed systems required.",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Microservices"],
    postedAt: "4 days ago",
  },
  {
    id: "6",
    title: "Marketing Manager",
    company: "GrowthCo",
    location: "Austin, TX",
    type: "Full-time" as const,
    salary: "$80k - $120k",
    description:
      "Drive our marketing strategy and campaigns across digital channels. Lead a team of marketing specialists and collaborate with sales.",
    skills: [
      "Digital Marketing",
      "SEO",
      "Content Strategy",
      "Analytics",
      "Leadership",
    ],
    postedAt: "2 days ago",
  },
  {
    id: "7",
    title: "Data Scientist",
    company: "AI Insights",
    location: "Boston, MA",
    type: "Full-time" as const,
    salary: "$130k - $170k",
    description:
      "Develop machine learning models and extract insights from large datasets. Work on cutting-edge AI projects with real-world impact.",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
    postedAt: "5 days ago",
  },
  {
    id: "8",
    title: "Mobile Developer",
    company: "AppWorks",
    location: "Miami, FL",
    type: "Full-time" as const,
    salary: "$95k - $135k",
    description:
      "Build native iOS and Android applications for our mobile-first platform. Experience with React Native or Flutter preferred.",
    skills: ["React Native", "iOS", "Android", "JavaScript", "Mobile UI"],
    postedAt: "3 days ago",
  },
  {
    id: "9",
    title: "Sales Representative",
    company: "SalesForce Pro",
    location: "Chicago, IL",
    type: "Full-time" as const,
    salary: "$60k - $90k + Commission",
    description:
      "Drive revenue growth by building relationships with potential clients. Strong communication skills and sales experience required.",
    skills: ["Sales", "CRM", "Communication", "Lead Generation", "Negotiation"],
    postedAt: "1 day ago",
  },
  {
    id: "10",
    title: "Cybersecurity Specialist",
    company: "SecureNet",
    location: "Washington, DC",
    type: "Full-time" as const,
    salary: "$115k - $155k",
    description:
      "Protect our infrastructure and data from security threats. Implement security best practices and conduct vulnerability assessments.",
    skills: [
      "Cybersecurity",
      "Penetration Testing",
      "Network Security",
      "CISSP",
      "Risk Assessment",
    ],
    postedAt: "6 days ago",
  },
  {
    id: "11",
    title: "Content Writer",
    company: "ContentHub",
    location: "Remote",
    type: "Remote" as const,
    salary: "$50k - $75k",
    description:
      "Create engaging content for our blog, website, and marketing campaigns. Strong writing skills and SEO knowledge required.",
    skills: [
      "Content Writing",
      "SEO",
      "Copywriting",
      "WordPress",
      "Social Media",
    ],
    postedAt: "2 days ago",
  },
  {
    id: "12",
    title: "Financial Analyst",
    company: "InvestCorp",
    location: "New York, NY",
    type: "Full-time" as const,
    salary: "$85k - $115k",
    description:
      "Analyze financial data and create reports to support business decisions. CFA certification preferred but not required.",
    skills: ["Financial Analysis", "Excel", "SQL", "Modeling", "Reporting"],
    postedAt: "4 days ago",
  },
];

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);

  const handleBookmark = (jobId: string) => {
    setBookmarkedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesLocation =
      locationQuery === "" ||
      job.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
      (locationQuery.toLowerCase() === "remote" && job.type === "Remote");

    const matchesType =
      selectedType === "" ||
      selectedType === "all" ||
      job.type === selectedType;

    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Search Header */}
      <section className="bg-white py-8 px-4 border-b">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Find Your Next Job
            </h1>
            <p className="text-gray-600 mb-6">
              Discover opportunities that match your skills and career goals
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-md p-6 border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Location or remote"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Button
                  size="lg"
                  className="h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Jobs
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedSalary}
                  onValueChange={setSelectedSalary}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Salary Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Salary</SelectItem>
                    <SelectItem value="50k">$50k+</SelectItem>
                    <SelectItem value="75k">$75k+</SelectItem>
                    <SelectItem value="100k">$100k+</SelectItem>
                    <SelectItem value="150k">$150k+</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block w-80">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-orange-600" />
                    Filter Jobs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Popular Categories</h3>
                    <div className="space-y-2">
                      {[
                        "Technology",
                        "Design",
                        "Marketing",
                        "Sales",
                        "Finance",
                        "Operations",
                      ].map((category) => (
                        <label
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-sm text-gray-700">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Experience Level</h3>
                    <div className="space-y-2">
                      {[
                        "Entry Level",
                        "Mid Level",
                        "Senior Level",
                        "Executive",
                      ].map((level) => (
                        <label
                          key={level}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-sm text-gray-700">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Company Size</h3>
                    <div className="space-y-2">
                      {[
                        "Startup (1-50)",
                        "Medium (51-500)",
                        "Large (500+)",
                      ].map((size) => (
                        <label
                          key={size}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-sm text-gray-700">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {filteredJobs.length} Jobs Found
                  </h2>
                  <p className="text-gray-600">
                    {searchQuery && `Results for "${searchQuery}"`}
                    {locationQuery && ` in ${locationQuery}`}
                  </p>
                </div>

                <Select defaultValue="recent">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="relevant">Most Relevant</SelectItem>
                    <SelectItem value="salary-high">
                      Salary: High to Low
                    </SelectItem>
                    <SelectItem value="salary-low">
                      Salary: Low to High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Job Listings */}
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    {...job}
                    isBookmarked={bookmarkedJobs.includes(job.id)}
                    onBookmark={handleBookmark}
                  />
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No jobs found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search criteria or filters
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setLocationQuery("");
                        setSelectedType("all");
                        setSelectedSalary("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Load More */}
              {filteredJobs.length > 0 && (
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    Load More Jobs
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
