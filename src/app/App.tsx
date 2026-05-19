import { lazy, Suspense } from "react";
import { PortfolioNav } from "./components/PortfolioNav";
import { AmbientBackground } from "./components/AmbientBackground";
import { MediaProvider } from "./lib/MediaProvider";
import {
  CoverSection,
  TableOfContentsSection,
  TaglineSection,
  ProfileSection,
  WhySonySection,
  EducationSection,
  SkillsSection,
  WorkingStyleSection,
  ExperienceSection,
  CaseStudy1,
  CaseStudy2,
  CaseStudy3,
  CaseStudy4,
  MatchingSection,
  AnalysisSection,
  FitSection,
  ContactSection,
} from "./components/Sections";

const AdminPage = lazy(() => import("./admin/AdminPage").then((module) => ({ default: module.AdminPage })));

export default function App() {
  const isAdmin = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <MediaProvider>
        <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0d0602" }} />}>
          <AdminPage />
        </Suspense>
      </MediaProvider>
    );
  }

  return (
    <MediaProvider>
      <div
        className="w-full min-h-screen"
        style={{
          background: "#0d0602",
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <AmbientBackground />
        <PortfolioNav />
        <div className="relative" style={{ zIndex: 2 }}>
        <CoverSection />
        <TableOfContentsSection />
        <TaglineSection />
        <ProfileSection />
        <WhySonySection />
        <EducationSection />
        <SkillsSection />
        <WorkingStyleSection />
        <ExperienceSection />
        <CaseStudy1 />
        <CaseStudy2 />
        <CaseStudy4 />
        <CaseStudy3 />
        <MatchingSection />
        <AnalysisSection />
        <FitSection />
        <ContactSection />
        </div>
      </div>
    </MediaProvider>
  );
}
