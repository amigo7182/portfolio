"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatedHeading } from "./animated-heading";
import { useMode } from "../../context/ModeContext";
import { SECTION_LABELS } from "../../config/modeLabels";

const EXPERIENCE = [
  {
    role: "Backend Developer Intern",
    company: "Arbuz.kz",
    period: "June — August 2025",
    status: "ACTIVE",
    description:
      "Developed backend services using Python and FastAPI for core e-commerce functionality — product catalog, cart, and order APIs — serving 10k+ monthly users and handling 50k+ API requests per day. Optimized common PostgreSQL/MySQL queries to cut average response times by 15%, and documented all endpoints via OpenAPI/Swagger, accelerating release cycles by 20%.",
    tech: ["Python", "FastAPI", "PostgreSQL", "MySQL", "OpenAPI"],
  },
  {
    role: "Frontend Developer Intern",
    company: "Freedom.kz",
    period: "June — August 2024",
    status: "COMPLETED",
    description:
      "Developed and integrated frontend components with backend APIs, supporting 1k+ daily active users across 10+ core features. Collaborated with backend engineers to define API contracts, reducing integration issues by ~25%. Optimized state management and cut unnecessary network calls, decreasing page load time by 20–30%.",
    tech: ["JavaScript", "React", "REST APIs", "State Management"],
  },
];

export function ExperienceSection() {
  const { mode }  = useMode();
  const isMachine = mode === "machine";
  const ref       = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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

  const L = SECTION_LABELS.experience;
  const dotBorder   = isMachine ? "border-[rgba(122,184,200,0.4)]"   : "border-[rgba(200,180,160,0.35)]";
  const lineBg      = isMachine ? "bg-[rgba(122,184,200,0.12)]"      : "bg-[rgba(200,180,160,0.1)]";
  const techBorder  = isMachine ? "border-[rgba(122,184,200,0.12)]"  : "border-[rgba(200,180,160,0.1)]";
  const techText    = isMachine ? "text-[#5a8a98]"                   : "text-[#8a7060]";
  const periodText  = isMachine ? "text-[#5a8a98]"                   : "text-[#8a7060]";
  const companyText = isMachine ? "text-[#5a8a98]"                   : "text-[#8a7060]";

  return (
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className={`absolute left-0 top-2 bottom-0 w-px transition-all duration-1000 delay-200 origin-top ${lineBg} ${
              inView ? "scale-y-100" : "scale-y-0"
            }`}
          />

          <div className="space-y-0">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={exp.company}
                className={`relative pl-10 pb-14 last:pb-0 transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: inView ? `${250 + i * 150}ms` : "0ms" }}
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0f1210] border transition-colors duration-300 ${dotBorder}`} />

                {/* Period + status pill */}
                <div className="flex items-center gap-3 mb-3">
                  <p className={`font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${periodText}`}>
                    {exp.period}
                  </p>
                  {isMachine && (
                    <span className="machine-pill">
                      {i === 0 ? "ACTIVE" : exp.status}
                    </span>
                  )}
                </div>

                {/* Role + Company */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-4">
                  <h3 className="text-xl md:text-2xl font-extralight text-[#f8f7f5] leading-tight">
                    {exp.role}
                  </h3>
                  <span className={`font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${companyText}`}>
                    @ {exp.company}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm font-light text-[#a89080] leading-relaxed mb-5 max-w-2xl">
                  {exp.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className={`font-mono text-xs border px-2 py-0.5 transition-colors duration-300 ${techText} ${techBorder}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
