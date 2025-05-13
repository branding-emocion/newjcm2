"use client";

import HeroSlider from "./HeroSlider";
import OurStyleSection from "./OurStyleSection";
import BlogSection from "./BlogSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      {/* <AboutSection /> */}
      {/* <ProjectsSection /> */}
      <ProjectsSection />
      <OurStyleSection />
      {/* <BlogSection /> */}
    </div>
  );
}
