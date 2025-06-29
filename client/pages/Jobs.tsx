import { useState, useEffect } from "react";
import axiosInstance from "@/apis/axiosConfig"; // Make sure this path is correct
import { Navigation } from "../components/ui/navigation";
import { JobCard } from "../components/ui/job-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
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
  Loader2,
} from "lucide-react";

// Define an interface for our transformed job object to ensure type safety
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  description: string;
  skills: string[];
  postedAt: string;
}

// Helper function to format date strings into "X days ago" format
const formatTimeAgo = (dateString: string): string => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

export default function Jobs() {
  // State for API data, loading, and errors
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for filtering and UI interaction
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch data from your backend
        const response = await axiosInstance.get("/user/jd");
        
        if (response.data && response.data.data) {
          // Transform the API data into the format the frontend expects
          const transformedJobs: Job[] = response.data.data.map((apiJob: any) => ({
            id: apiJob.id.toString(),
            title: apiJob.job_title,
            description: apiJob.job_overview,
            skills: apiJob.required_skills ? apiJob.required_skills.split(',').map((skill: string) => skill.trim()) : [],
            postedAt: formatTimeAgo(apiJob.created_at),
            
            // NOTE: Using placeholder values for data not present in the API response
            company: "TalentSync Partner", 
            location: "Remote",
            type: "Full-time",
            salary: "Competitive Salary",
          }));
          setJobs(transformedJobs);
        } else {
            throw new Error("Invalid data format received from the server.");
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Could not load jobs. Please check the connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // The empty array ensures this effect runs only once

  const handleBookmark = (jobId: string) => {
    setBookmarkedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  // Apply filters to the job list from the state
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Job</h1>
            <p className="text-gray-600 mb-6">Discover opportunities that match your skills and career goals</p>
            <div className="bg-white rounded-lg shadow-md p-6 border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input placeholder="Job title, keywords, or company" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-12" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input placeholder="Location or remote" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} className="pl-10 h-12" />
                </div>
                <Button size="lg" className="h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                  <Search className="w-4 h-4 mr-2" /> Search Jobs
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="Job Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSalary} onValueChange={setSelectedSalary}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="Salary Range" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Salary</SelectItem>
                    <SelectItem value="50k">$50k+</SelectItem>
                    <SelectItem value="75k">$75k+</SelectItem>
                    <SelectItem value="100k">$100k+</SelectItem>
                    <SelectItem value="150k">$150k+</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                  <SlidersHorizontal className="w-4 h-4 mr-2" /> More Filters
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
              {loading && (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                </div>
              )}

              {error && (
                <Card className="text-center py-12 bg-red-50 border-red-200">
                  <CardContent>
                    <h3 className="text-xl font-semibold text-red-700 mb-2">An Error Occurred</h3>
                    <p className="text-red-600">{error}</p>
                  </CardContent>
                </Card>
              )}

              {!loading && !error && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{filteredJobs.length} Jobs Found</h2>
                      <p className="text-gray-600">
                        {searchQuery && `Results for "${searchQuery}"`}
                        {locationQuery && ` in ${locationQuery}`}
                      </p>
                    </div>
                    <Select defaultValue="recent">
                      <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="relevant">Most Relevant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {filteredJobs.length > 0 ? (
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
                  ) : (
                    <Card className="text-center py-12">
                      <CardContent>
                        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
                        <Button variant="outline" onClick={() => { setSearchQuery(""); setLocationQuery(""); setSelectedType("all"); }}>
                          Clear Filters
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {filteredJobs.length > 0 && (
                    <div className="text-center mt-8">
                      <Button variant="outline" size="lg">Load More Jobs</Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}