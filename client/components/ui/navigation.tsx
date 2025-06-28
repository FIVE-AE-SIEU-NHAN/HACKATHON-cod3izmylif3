import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Badge } from "./badge";
import { Search, Bell, Briefcase, Users, Settings, LogOut } from "lucide-react";
import { Input } from "./input";

interface NavigationProps {
  userRole?: "guest" | "candidate" | "employer" | "admin";
  userName?: string;
}

export function Navigation({ userRole = "guest", userName }: NavigationProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="14" x="2" y="6" rx="2" />
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              TalentSync
            </span>
          </Link>

          {/* Search Bar (visible for logged-in users) */}
          {userRole !== "guest" && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs, companies, candidates..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {userRole === "guest" ? (
              <>
                <Link
                  to="/jobs"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Jobs
                </Link>
                <Link
                  to="/companies"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Companies
                </Link>
                <Link
                  to="/cv-analysis"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  CV Analysis
                </Link>
                <Link
                  to="/jd-analysis-demo"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  JD Analysis
                </Link>
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Role-specific navigation */}
                {userRole === "candidate" && (
                  <>
                    <Link
                      to="/dashboard"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/dashboard")
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-orange-600"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/jobs"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/jobs")
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-orange-600"
                      }`}
                    >
                      Find Jobs
                    </Link>
                    <Link
                      to="/applications"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/applications")
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-orange-600"
                      }`}
                    >
                      Applications
                    </Link>
                  </>
                )}

                {userRole === "employer" && (
                  <>
                    <Link
                      to="/employer-dashboard"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/employer-dashboard")
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-orange-600"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/post-job"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/post-job")
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-orange-600"
                      }`}
                    >
                      Post Job
                    </Link>
                    <Link
                      to="/candidates"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/candidates")
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-orange-600"
                      }`}
                    >
                      Candidates
                    </Link>
                  </>
                )}

                {userRole === "admin" && (
                  <>
                    <Link
                      to="/admin-dashboard"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/admin-dashboard")
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-orange-600"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/users"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/admin/users")
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-orange-600"
                      }`}
                    >
                      Users
                    </Link>
                    <Link
                      to="/admin/analytics"
                      className={`text-sm font-medium transition-colors ${
                        isActive("/admin/analytics")
                          ? "text-orange-600"
                          : "text-gray-600 hover:text-orange-600"
                      }`}
                    >
                      Analytics
                    </Link>
                  </>
                )}

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-orange-500">
                    3
                  </Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={userName} />
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          {userName?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium">
                        {userName || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {userRole}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
