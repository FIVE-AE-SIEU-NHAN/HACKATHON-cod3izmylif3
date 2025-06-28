import { Link, useLocation } from "react-router-dom";
import { Badge } from "./badge";
import {
  FileText,
  Building,
  User,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface SidebarProps {
  userRole: "candidate" | "employer" | "admin";
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const sidebarMenus = {
  candidate: [
    {
      title: "CV đã Gen",
      href: "/dashboard/cvs",
      icon: FileText,
      badge: "3",
    },
    {
      title: "Công ty đã ứng tuyển",
      href: "/dashboard/companies",
      icon: Building,
      badge: "5",
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ],
  employer: [
    {
      title: "Việc đã Post",
      href: "/employer-dashboard/jobs",
      icon: Briefcase,
      badge: "8",
    },
    {
      title: "Ứng viên ứng tuyển",
      href: "/employer-dashboard/candidates",
      icon: Users,
      badge: "24",
    },
    {
      title: "Profile công ty",
      href: "/employer-dashboard/profile",
      icon: Building,
    },
  ],
  admin: [
    {
      title: "CV đã Gen",
      href: "/admin-dashboard/cvs",
      icon: FileText,
      badge: "156",
    },
    {
      title: "Ứng tuyển",
      href: "/admin-dashboard/applications",
      icon: Users,
      badge: "89",
    },
    {
      title: "Công ty",
      href: "/admin-dashboard/companies",
      icon: Building,
      badge: "42",
    },
    {
      title: "Analytics",
      href: "/admin-dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/admin-dashboard/settings",
      icon: Settings,
    },
  ],
};

export function Sidebar({
  userRole,
  isCollapsed = false,
  onToggle,
}: SidebarProps) {
  const location = useLocation();
  const menuItems = sidebarMenus[userRole];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                  active
                    ? "bg-orange-50 text-orange-600 border border-orange-200"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    active ? "text-orange-600" : "text-gray-500",
                  )}
                />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          active
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-600",
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {userRole === "candidate"
                  ? "John Doe"
                  : userRole === "employer"
                    ? "TechCorp"
                    : "Admin"}
              </p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
