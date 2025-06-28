import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Companies from "./pages/Companies";
import CVAnalysis from "./pages/CVAnalysis";
import CVAnalysisDemo from "./pages/CVAnalysisDemo";
import CVMatchedCompanies from "./pages/CVMatchedCompanies";
import JDAnalysisDemo from "./pages/JDAnalysisDemo";
import JobPostedSuccess from "./pages/JobPostedSuccess";
import CandidateDashboard from "./pages/CandidateDashboard";
import CandidateCVs from "./pages/CandidateCVs";
import CandidateCompanies from "./pages/CandidateCompanies";
import CandidateProfile from "./pages/CandidateProfile";
import EmployerDashboard from "./pages/EmployerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/cv-analysis" element={<CVAnalysis />} />
          <Route path="/cv-demo" element={<CVAnalysisDemo />} />
          <Route
            path="/cv-matched-companies"
            element={<CVMatchedCompanies />}
          />
          <Route path="/jd-analysis-demo" element={<JDAnalysisDemo />} />
          <Route path="/job-posted-success" element={<JobPostedSuccess />} />
          <Route path="/dashboard" element={<CandidateDashboard />} />
          <Route path="/dashboard/cvs" element={<CandidateCVs />} />
          <Route path="/dashboard/companies" element={<CandidateCompanies />} />
          <Route path="/dashboard/profile" element={<CandidateProfile />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
