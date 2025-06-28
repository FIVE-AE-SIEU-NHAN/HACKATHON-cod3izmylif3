import { ReactNode, useState } from "react";
import { Navigation } from "./navigation";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "candidate" | "employer" | "admin";
  userName?: string;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({
  children,
  userRole,
  userName,
  title,
  subtitle,
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole={userRole} userName={userName} />

      <div className="flex">
        <Sidebar
          userRole={userRole}
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {(title || subtitle) && (
              <div className="mb-8">
                {title && (
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-lg text-gray-600">{subtitle}</p>
                )}
              </div>
            )}

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
