import "./App.css";
import { Component as HeroSection } from "./components/ui/hero-section";
import { Navbar } from "./components/ui/navbar";
import { ProjectsSection } from "./components/ui/projects-section";
import { AboutSection } from "./components/ui/about-section";
import { EducationSection } from "./components/ui/education-section";
import { ExperienceSection } from "./components/ui/experience-section";
import { ContactSection } from "./components/ui/contact-section";
import { MachineView } from "./components/ui/machine-view";
import { useMode } from "./context/ModeContext";

export default function App() {
  const { mode } = useMode();
  const isMachine = mode === "machine";

  return (
    <div className={isMachine ? "bg-[#080c0f]" : "bg-[#1a1d18]"}>
      <Navbar />
      {isMachine ? (
        <MachineView />
      ) : (
        <>
          <div id="home">
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
        </>
      )}
    </div>
  );
}
