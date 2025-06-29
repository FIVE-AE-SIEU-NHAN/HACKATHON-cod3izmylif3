import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Badge } from "./badge";
import { Search, Bell, Users, Settings, LogOut } from "lucide-react";
import { Input } from "./input";

// Define a type for the user data we expect in localStorage
interface User {
  id: string;
  name: string;
  email: string;
  role: 0 | 1 | 2; // 0: Admin, 1: Candidate, 2: Employer
}

type UserRoleString = "guest" | "candidate" | "employer" | "admin";

// Helper function to map numeric role to string role
const mapNumericRoleToString = (role: number): UserRoleString => {
  switch (role) {
    case 0:
      return "admin";
    case 1:
      return "candidate";
    case 2:
      return "employer";
    default:
      return "guest";
  }
};

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  // The component now manages its own state based on localStorage.
  const [userRole, setUserRole] = useState<UserRoleString>("guest");
  const [userName, setUserName] = useState<string>("");

  // --- EFFECT HOOK TO SYNC WITH LOCALSTORAGE ---
  useEffect(() => {
    // This function reads from localStorage and updates the component's state.
    const checkUserStatus = () => {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        try {
          const userData: User = JSON.parse(userJson);
          setUserRole(mapNumericRoleToString(userData.role));
          setUserName(userData.name || userData.email); // Use name, fallback to email
        } catch (error) {
          console.error("Failed to parse user data from localStorage", error);
          handleLogout(); // Clear corrupted data
        }
      } else {
        setUserRole("guest");
        setUserName("");
      }
    };

    // Check status on initial component mount
    checkUserStatus();

    // Add event listener to react to changes in other tabs or after login/logout
    window.addEventListener("storage", checkUserStatus);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", checkUserStatus);
    };
  }, []);

  // --- LOGOUT HANDLER ---
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("login_data"); // Clear all auth-related data
    
    // Dispatch a storage event to notify other components (including this one) instantly
    window.dispatchEvent(new Event("storage"));
    
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src="/logo.png" alt="CVSync Logo"/>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              CVSync
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
          <div className="hidden md:flex items-center space-x-6">
            {userRole === "guest" ? (
              <>
                <Link to="/jobs" className="text-gray-600 hover:text-orange-600 transition-colors">Jobs</Link>
                <Link to="/companies" className="text-gray-600 hover:text-orange-600 transition-colors">Companies</Link>
                <Link to="/cv-analysis" className="text-gray-600 hover:text-orange-600 transition-colors">CV Analysis</Link>
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
                    <Link to="/dashboard" className={`text-sm font-medium transition-colors ${isActive("/dashboard") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"}`}>Dashboard</Link>
                    <Link to="/cv-analysis" className={`text-sm font-medium transition-colors ${isActive("/cv-analysis") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"}`}>CV Analysis</Link>
                    
                    <Link to="/jobs" className={`text-sm font-medium transition-colors ${isActive("/jobs") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"}`}>Find Jobs</Link>
                    <Link to="/applications" className={`text-sm font-medium transition-colors ${isActive("/applications") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"}`}>Applications</Link>
                  </>
                )}

                {userRole === "employer" && (
                  <>
                    <Link to="/employer-dashboard" className={`text-sm font-medium transition-colors ${isActive("/employer-dashboard") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"}`}>Dashboard</Link>
                    <Link to="/post-job" className={`text-sm font-medium transition-colors ${isActive("/post-job") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"}`}>Post Job</Link>
                    <Link to="/candidates" className={`text-sm font-medium transition-colors ${isActive("/candidates") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"}`}>Candidates</Link>
                  </>
                )}

                {userRole === "admin" && (
                  <>
                    <Link to="/admin/dashboard" className={`text-sm font-medium transition-colors ${isActive("/admin/dashboard") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"}`}>Dashboard</Link>
                    <Link to="/admin/users" className={`text-sm font-medium transition-colors ${isActive("/admin/users") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"}`}>Users</Link>
                    <Link to="/admin/analytics" className={`text-sm font-medium transition-colors ${isActive("/admin/analytics") ? "text-orange-600" : "text-gray-600 hover:text-orange-600"}`}>Analytics</Link>
                  </>
                )}

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative rounded-full">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center p-0 text-xs bg-orange-500 border-2 border-white">3</Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt={userName} />
                        <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
                          {userName?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground capitalize">{userRole}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => navigate('/profile')}>
                      <Users className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
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