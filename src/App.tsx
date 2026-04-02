import "./App.css";
import { Component as HeroSection } from "./components/ui/hero-section";
import { Navbar } from "./components/ui/navbar";
import { ProjectsSection } from "./components/ui/projects-section";
import { AboutSection } from "./components/ui/about-section";
import { EducationSection } from "./components/ui/education-section";
import { ExperienceSection } from "./components/ui/experience-section";
import { ContactSection } from "./components/ui/contact-section";
import { useMode } from "./context/ModeContext";

export default function App() {
  // mode drives a key on the hero so its entrance animation replays on switch
  const { mode } = useMode();

  return (
    <div className="bg-[#1a1d18]">
      <Navbar />
      <div id="home">
        {/* key={mode} causes the hero to fully remount on mode change,
            re-running the word-entrance animation in the new mode's text */}
        <HeroSection key={mode} />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="education">
        <EducationSection />
      </div>
      <div id="experience">
        <ExperienceSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
}
