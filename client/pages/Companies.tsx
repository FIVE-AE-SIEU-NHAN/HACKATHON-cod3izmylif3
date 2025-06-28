import { useState } from "react";
import { Navigation } from "../components/ui/navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
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
  Users,
  Building,
  Star,
  ExternalLink,
  Filter,
  TrendingUp,
} from "lucide-react";

const companies = [
  {
    id: "1",
    name: "TechCorp",
    logo: "TC",
    industry: "Technology",
    size: "1000-5000",
    location: "San Francisco, CA",
    description:
      "Leading technology company focused on innovative software solutions and AI-powered products.",
    openJobs: 24,
    rating: 4.8,
    reviews: 342,
    founded: "2010",
    website: "techcorp.com",
    specialties: ["Software Development", "AI/ML", "Cloud Computing"],
    culture: ["Innovation", "Remote-friendly", "Work-life balance"],
  },
  {
    id: "2",
    name: "InnovateLabs",
    logo: "IL",
    industry: "Technology",
    size: "200-500",
    location: "New York, NY",
    description:
      "Cutting-edge research and development company specializing in emerging technologies.",
    openJobs: 15,
    rating: 4.6,
    reviews: 128,
    founded: "2015",
    website: "innovatelabs.com",
    specialties: ["R&D", "Product Innovation", "Tech Consulting"],
    culture: ["Fast-paced", "Learning-focused", "Collaborative"],
  },
  {
    id: "3",
    name: "CloudScale",
    logo: "CS",
    industry: "Cloud Services",
    size: "500-1000",
    location: "Seattle, WA",
    description:
      "Cloud infrastructure and DevOps solutions provider for enterprise clients worldwide.",
    openJobs: 18,
    rating: 4.7,
    reviews: 256,
    founded: "2012",
    website: "cloudscale.io",
    specialties: ["Cloud Infrastructure", "DevOps", "Enterprise Solutions"],
    culture: ["Technical excellence", "Growth mindset", "Diversity"],
  },
  {
    id: "4",
    name: "DesignStudio",
    logo: "DS",
    industry: "Design",
    size: "50-200",
    location: "Los Angeles, CA",
    description:
      "Award-winning design agency creating beautiful digital experiences for brands worldwide.",
    openJobs: 8,
    rating: 4.9,
    reviews: 89,
    founded: "2018",
    website: "designstudio.com",
    specialties: ["UX/UI Design", "Branding", "Digital Marketing"],
    culture: ["Creative freedom", "Client-focused", "Work-life balance"],
  },
  {
    id: "5",
    name: "DataFlow",
    logo: "DF",
    industry: "Data Analytics",
    size: "200-500",
    location: "Austin, TX",
    description:
      "Big data analytics platform helping businesses make data-driven decisions at scale.",
    openJobs: 12,
    rating: 4.5,
    reviews: 167,
    founded: "2014",
    website: "dataflow.com",
    specialties: ["Data Science", "Analytics", "Business Intelligence"],
    culture: ["Data-driven", "Innovation", "Continuous learning"],
  },
  {
    id: "6",
    name: "GrowthCo",
    logo: "GC",
    industry: "Marketing",
    size: "100-200",
    location: "Chicago, IL",
    description:
      "Digital marketing agency focused on growth hacking and performance marketing strategies.",
    openJobs: 6,
    rating: 4.4,
    reviews: 94,
    founded: "2016",
    website: "growthco.com",
    specialties: ["Digital Marketing", "SEO/SEM", "Growth Strategy"],
    culture: ["Results-oriented", "Entrepreneurial", "Team collaboration"],
  },
  {
    id: "7",
    name: "AI Insights",
    logo: "AI",
    industry: "Artificial Intelligence",
    size: "100-500",
    location: "Boston, MA",
    description:
      "AI research company developing machine learning solutions for healthcare and finance.",
    openJobs: 20,
    rating: 4.8,
    reviews: 145,
    founded: "2017",
    website: "aiinsights.com",
    specialties: ["Machine Learning", "AI Research", "Healthcare Tech"],
    culture: ["Research-focused", "Innovation", "Social impact"],
  },
  {
    id: "8",
    name: "AppWorks",
    logo: "AW",
    industry: "Mobile Development",
    size: "50-100",
    location: "Miami, FL",
    description:
      "Mobile app development studio creating innovative iOS and Android applications.",
    openJobs: 7,
    rating: 4.6,
    reviews: 72,
    founded: "2019",
    website: "appworks.com",
    specialties: ["Mobile Development", "iOS", "Android"],
    culture: ["Mobile-first", "Creative", "Agile"],
  },
  {
    id: "9",
    name: "SecureNet",
    logo: "SN",
    industry: "Cybersecurity",
    size: "500-1000",
    location: "Washington, DC",
    description:
      "Cybersecurity firm providing enterprise security solutions and consulting services.",
    openJobs: 16,
    rating: 4.7,
    reviews: 203,
    founded: "2011",
    website: "securenet.com",
    specialties: ["Cybersecurity", "Compliance", "Risk Management"],
    culture: ["Security-first", "Professional growth", "Mission-driven"],
  },
  {
    id: "10",
    name: "InvestCorp",
    logo: "IC",
    industry: "Finance",
    size: "1000+",
    location: "New York, NY",
    description:
      "Investment management firm providing financial services and wealth management solutions.",
    openJobs: 22,
    rating: 4.5,
    reviews: 387,
    founded: "2008",
    website: "investcorp.com",
    specialties: [
      "Investment Management",
      "Wealth Management",
      "Financial Planning",
    ],
    culture: ["Performance-driven", "Professional", "Client-focused"],
  },
];

export default function Companies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "" ||
      selectedIndustry === "all" ||
      company.industry === selectedIndustry;
    const matchesSize =
      selectedSize === "" ||
      selectedSize === "all" ||
      company.size === selectedSize;
    const matchesLocation =
      selectedLocation === "" ||
      company.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesIndustry && matchesSize && matchesLocation;
  });

  const industries = [...new Set(companies.map((c) => c.industry))];
  const sizes = [...new Set(companies.map((c) => c.size))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-white py-8 px-4 border-b">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Discover Companies
            </h1>
            <p className="text-gray-600 mb-6">
              Explore top companies and find your next career opportunity
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-md p-6 border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>

                <Select
                  value={selectedIndustry}
                  onValueChange={setSelectedIndustry}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Company Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    {sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size} employees
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {companies.length}+
              </div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {companies.reduce((sum, c) => sum + c.openJobs, 0)}+
              </div>
              <div className="text-gray-600">Open Positions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {industries.length}
              </div>
              <div className="text-gray-600">Industries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">4.6</div>
              <div className="text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredCompanies.length} Companies Found
              </h2>
              <p className="text-gray-600">
                {searchQuery && `Results for "${searchQuery}"`}
              </p>
            </div>

            <Select defaultValue="rating">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="jobs">Most Jobs</SelectItem>
                <SelectItem value="size">Company Size</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Card
                key={company.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="" alt={company.name} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold">
                        {company.logo}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                        {company.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {company.industry}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {company.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({company.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {company.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {company.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {company.size} employees
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="w-4 h-4 mr-2" />
                      Founded {company.founded}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {company.specialties
                          .slice(0, 3)
                          .map((specialty, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Culture
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {company.culture.slice(0, 2).map((value, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs border-orange-200 text-orange-700"
                          >
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm">
                      <span className="font-semibold text-orange-600">
                        {company.openJobs}
                      </span>
                      <span className="text-gray-600"> open jobs</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Jobs
                      </Button>
                      <Button size="sm">Follow</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No companies found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedIndustry("all");
                    setSelectedSize("all");
                    setSelectedLocation("");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Load More */}
          {filteredCompanies.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Companies
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
