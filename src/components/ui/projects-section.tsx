"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatedHeading } from "./animated-heading";
import { useMode } from "../../context/ModeContext";
import { SECTION_LABELS } from "../../config/modeLabels";

type Project = {
  title: string;
  year: string;
  description: string;
  highlights: string[];
  tech: string[];
  live: string;
  repo: string;
  status: string; // machine-mode status pill label
};

const PROJECTS: Project[] = [
  {
    title: "Distributed Backend Service",
    year: "2025",
    status: "DEPLOYED",
    description:
      "RESTful backend service simulating a real-world social platform — authenticated users, content creation, role-based authorization, and Alembic-managed migrations.",
    highlights: [
      "Secure authentication & role-based authorization reducing unauthorized access risks across all protected endpoints",
      "Normalized relational schemas for users and posts with full CRUD lifecycle",
      "Schema evolution managed via Alembic migrations — no manual SQL changes",
      "Deployed to Heroku with environment-based configuration for scalable cloud execution",
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "Alembic", "Heroku"],
    live: "#",
    repo: "https://github.com/amigo7182",
  },
  {
    title: "AI Email Processing System",
    year: "2025",
    status: "DEPLOYED",
    description:
      "Full-stack web app that manages long email threads by generating AI-powered summaries and extracting key points. React UI → Node.js API → AI model → Supabase.",
    highlights: [
      "AI summarization pipeline: cleans and formats raw email threads, sends to model, returns short summary + extracted key highlights",
      "Secure auth with Supabase — login/signup, session handling, and protected routes so only authenticated users access their data",
      "REST API endpoints (/summarize, /emails, /auth) with request validation and clean separation of business logic",
      "Async handling with managed loading states prevents UI freeze during AI calls",
      "Relational data model: user → email threads → generated summaries stored in Supabase",
    ],
    tech: ["React", "Node.js", "Supabase", "REST API", "AI Integration"],
    live: "#",
    repo: "https://github.com/amigo7182",
  },
  {
    title: "Arduino Rehabilitation Device",
    year: "2024",
    status: "TESTED",
    description:
      "Hardware + software system helping patients recover finger motor function after injury or neurological issues. Tested in hospitals in Almaty, Kazakhstan.",
    highlights: [
      "Real-time feedback loop: sensor detects finger movement → Arduino processes signal → actuator assists or resists motion",
      "Low-level C++ control for deterministic, reliable real-time processing — no OS latency",
      "Handles pressure and flex sensor input, converting analog signals into precise motor commands",
      "Tested with real patients in Almaty hospitals, targeting dexterity, muscle memory, and recovery speed",
    ],
    tech: ["Arduino", "C++", "Sensors", "Actuators", "Real-time Processing"],
    live: "#",
    repo: "https://github.com/amigo7182",
  },
  {
    title: "Customer Service Bot",
    year: "2024",
    status: "ACTIVE",
    description:
      "Python automation bot for one of the largest petrol station networks in Kazakhstan — handles high volumes of customer inquiries, identifies intent, and routes to auto-response or human escalation. Saved ~$10,000 annually.",
    highlights: [
      "Rule-based intent recognition parses incoming messages and classifies query type — no ML overhead, high reliability at scale",
      "Smart routing logic: common inquiries answered automatically, complex or ambiguous cases escalated to human operators",
      "Designed to handle high request volume with efficient fallback mechanisms for edge cases",
      "Reduced manual customer support workload significantly, improving response time and operational efficiency",
      "Saved the business approximately $10,000 annually by automating repetitive support tasks",
    ],
    tech: ["Python", "Rule-based NLP", "Automation", "Routing Logic"],
    live: "#",
    repo: "https://github.com/amigo7182",
  },
];

const ExternalIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

function ProjectModal({
  project,
  onClose,
  isMachine,
}: {
  project: Project;
  onClose: () => void;
  isMachine: boolean;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const accentText   = isMachine ? "text-[#7ab8c8]"                 : "text-[#8a7060]";
  const dividerColor = isMachine ? "rgba(122,184,200,0.08)"         : "rgba(200,180,160,0.08)";
  const L = SECTION_LABELS.projects;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div
        className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#1a1d18] animate-modal-in ${
          isMachine
            ? "border border-[rgba(122,184,200,0.15)]"
            : "border border-[rgba(200,180,160,0.12)]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div
          className="sticky top-0 bg-[#1a1d18] px-8 py-5 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${dividerColor}` }}
        >
          <div className="flex items-center gap-3">
            <span className={`font-mono text-xs tracking-widest uppercase ${accentText}`}>
              {project.year}
            </span>
            {isMachine && (
              <span className="machine-pill">{project.status}</span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className={`w-7 h-7 flex items-center justify-center transition-colors duration-200 cursor-pointer ${accentText} hover:text-[#c8b4a0]`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <h2 className="text-3xl md:text-4xl font-extralight text-[#f8f7f5] tracking-tight leading-tight mb-5">
            {project.title}
          </h2>
          <p className="text-sm font-light text-[#a89080] leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-6 h-px ${isMachine ? "bg-[rgba(122,184,200,0.25)]" : "bg-[rgba(200,180,160,0.25)]"}`} />
            <span className={`font-mono text-xs uppercase tracking-[0.2em] ${accentText}`}>
              {isMachine ? "// highlights" : "Key Features"}
            </span>
            <div className="flex-1 h-px" style={{ background: dividerColor }} />
          </div>

          {/* Highlights */}
          <ul className="space-y-4 mb-8">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className={`font-mono mt-0.5 shrink-0 text-xs ${accentText}`}>0{i + 1}</span>
                <p className={`text-sm font-light leading-relaxed ${isMachine ? "text-[#7ab8c8]/80" : "text-[#c8b4a0]"}`}>{h}</p>
              </li>
            ))}
          </ul>

          {/* Tech */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t) => (
              <span key={t} className={`font-mono text-xs border px-3 py-1 ${isMachine ? "text-[#7ab8c8] border-[rgba(122,184,200,0.2)]" : "text-[#c8b4a0] border-[rgba(200,180,160,0.2)]"}`}>
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 pt-6" style={{ borderTop: `1px solid ${dividerColor}` }}>
            <a
              href={project.live}
              className={`font-mono text-xs uppercase tracking-widest flex items-center gap-1.5 cursor-pointer transition-colors duration-200 ${accentText} hover:text-[#c8b4a0]`}
            >
              {L.liveLabel[isMachine ? "machine" : "human"]} <ExternalIcon />
            </a>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-mono text-xs uppercase tracking-widest flex items-center gap-1.5 cursor-pointer transition-colors duration-200 ${accentText} hover:text-[#c8b4a0]`}
            >
              GitHub <ExternalIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { mode }   = useMode();
  const isMachine  = mode === "machine";
  const ref        = useRef<HTMLDivElement>(null);
  const [inView,    setInView]   = useState(false);
  const [selected,  setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const L = SECTION_LABELS.projects;
  const accentOpacity = isMachine ? "rgba(122,184,200,0.07)" : "rgba(200,180,160,0.07)";
  const cardBg        = isMachine ? "hover:bg-[rgba(122,184,200,0.03)]" : "hover:bg-[rgba(200,180,160,0.04)]";
  const techBorder    = isMachine
    ? "border-[rgba(122,184,200,0.12)] group-hover:border-[rgba(122,184,200,0.28)] group-hover:text-[#7ab8c8]"
    : "border-[rgba(200,180,160,0.12)] group-hover:border-[rgba(200,180,160,0.25)] group-hover:text-[#a89080]";

  return (
    <>
      <section className="w-full bg-[#0f1210] py-24 md:py-32 text-left">
        <div ref={ref} className="max-w-6xl mx-auto px-8 md:px-16">

          {/* Label */}
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className={`font-mono text-xs uppercase tracking-[0.2em] opacity-60 mb-4 transition-colors duration-300 ${isMachine ? "text-[#7ab8c8]" : "text-[#c8b4a0]"}`}>
              {L.eyebrow[mode]}
            </p>
            <div className={`w-8 h-px mb-10 transition-colors duration-300 ${isMachine ? "bg-[rgba(122,184,200,0.3)]" : "bg-[rgba(200,180,160,0.3)]"}`} />
          </div>

          <AnimatedHeading className="text-4xl md:text-5xl lg:text-6xl font-extralight text-[#f8f7f5] tracking-tight mb-16">
            {L.heading[mode]}
          </AnimatedHeading>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: accentOpacity }}>
            {PROJECTS.map((project, i) => (
              <div
                key={project.title}
                onClick={() => setSelected(project)}
                className={`group bg-[#0f1210] p-8 md:p-10 ${cardBg} transition-all duration-300 cursor-pointer ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDuration: "700ms", transitionDelay: inView ? `${150 + i * 100}ms` : "0ms" }}
              >
                {/* Header row: year + status pill (machine) + CTA */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs tracking-widest ${isMachine ? "text-[#5a8a98]" : "text-[#8a7060]"}`}>
                      {project.year}
                    </span>
                    {isMachine && (
                      <span className="machine-pill">{project.status}</span>
                    )}
                  </div>
                  <span className={`font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-widest uppercase flex items-center gap-1 ${isMachine ? "text-[#7ab8c8]" : "text-[#8a7060]"}`}>
                    {L.cardCta[mode]}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                <h3 className={`text-2xl md:text-3xl font-extralight leading-tight transition-colors duration-300 ${isMachine ? "text-[#c8d8dc] group-hover:text-[#e0f0f4]" : "text-[#e6e1d7] group-hover:text-[#f8f7f5]"}`}>
                  {project.title}
                </h3>

                <p className={`mt-4 text-sm font-light leading-relaxed transition-colors duration-300 ${isMachine ? "text-[#4a7a8a] group-hover:text-[#5a8a98]" : "text-[#8a7060] group-hover:text-[#a89080]"}`}>
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className={`font-mono text-xs border px-2 py-0.5 transition-all duration-300 ${isMachine ? "text-[#5a8a98]" : "text-[#8a7060]"} ${techBorder}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
          isMachine={isMachine}
        />
      )}
    </>
  );
}
