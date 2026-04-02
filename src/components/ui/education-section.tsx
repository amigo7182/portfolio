"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatedHeading } from "./animated-heading";
import { useMode } from "../../context/ModeContext";
import { SECTION_LABELS } from "../../config/modeLabels";

const EDUCATION = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Northeastern University",
    period: "2025 — Expected May 2028",
    location: "Boston, MA",
    gpa: "3.56",
  },
];

const AWARDS = [
  {
    title: "Silver Medal",
    event: "American Mathematics Competition",
    year: "2024",
  },
  {
    title: "Gold Medal",
    event: "Asian International Mathematics Olympiad",
    year: "2022",
  },
];

export function EducationSection() {
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

  const L = SECTION_LABELS.education;
  const accentText  = isMachine ? "text-[#7ab8c8]"                   : "text-[#c8b4a0]";
  const dimText     = isMachine ? "text-[#5a8a98]"                   : "text-[#8a7060]";
  const borderLeft  = isMachine ? "border-[rgba(122,184,200,0.15)]"  : "border-[rgba(200,180,160,0.15)]";
  const pillBorder  = isMachine ? "border-[rgba(122,184,200,0.15)]"  : "border-[rgba(200,180,160,0.15)]";
  const awardBorder = isMachine ? "border-[rgba(122,184,200,0.12)]"  : "border-[rgba(200,180,160,0.12)]";

  return (
    <section className="w-full bg-[#0f1210] py-24 md:py-32 text-left">
      <div ref={ref} className="max-w-6xl mx-auto px-8 md:px-16">

        {/* Label */}
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className={`font-mono text-xs uppercase tracking-[0.2em] opacity-60 mb-4 transition-colors duration-300 ${accentText}`}>
            {L.eyebrow[mode]}
          </p>
          <div className={`w-8 h-px mb-10 transition-colors duration-300 ${isMachine ? "bg-[rgba(122,184,200,0.3)]" : "bg-[rgba(200,180,160,0.3)]"}`} />
        </div>

        <AnimatedHeading className="text-4xl md:text-5xl lg:text-6xl font-extralight text-[#f8f7f5] tracking-tight mb-16">
          {L.heading[mode]}
        </AnimatedHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Degree */}
          <div className={`transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className={`font-mono text-xs uppercase tracking-[0.2em] mb-6 transition-colors duration-300 ${dimText}`}>
              {isMachine ? "// degree.record" : "Degree"}
            </p>
            {EDUCATION.map((ed) => (
              <div key={ed.institution} className={`border-l pl-6 transition-colors duration-300 ${borderLeft}`}>
                <h3 className="text-2xl md:text-3xl font-extralight text-[#f8f7f5] leading-tight mb-2">
                  {ed.institution}
                </h3>
                <p className={`text-sm font-light mb-4 transition-colors duration-300 ${accentText}`}>
                  {ed.degree}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <span className={`font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${dimText}`}>
                    {ed.period}
                  </span>
                  <span className={`font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${dimText}`}>
                    {ed.location}
                  </span>
                </div>
                <div className={`mt-5 inline-flex items-center gap-3 border px-4 py-2 transition-colors duration-300 ${pillBorder}`}>
                  <span className={`font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${dimText}`}>
                    {isMachine ? "GPA_SCORE" : "GPA"}
                  </span>
                  <span className={`font-mono text-sm transition-colors duration-300 ${accentText}`}>
                    {ed.gpa}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Awards */}
          <div className={`transition-all duration-700 delay-250 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className={`font-mono text-xs uppercase tracking-[0.2em] mb-6 transition-colors duration-300 ${dimText}`}>
              {isMachine ? "// performance.log" : "Honors & Awards"}
            </p>
            <div className="space-y-6">
              {AWARDS.map((award, i) => (
                <div
                  key={award.event}
                  className={`flex items-start gap-5 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: inView ? `${350 + i * 120}ms` : "0ms" }}
                >
                  {/* Year pill */}
                  <span className={`font-mono text-xs border px-2 py-1 shrink-0 mt-0.5 transition-colors duration-300 ${dimText} ${awardBorder}`}>
                    {award.year}
                  </span>
                  <div>
                    <p className="text-base font-light text-[#e6e1d7] leading-snug">{award.title}</p>
                    <p className={`font-mono text-xs mt-1 tracking-wide transition-colors duration-300 ${dimText}`}>
                      {award.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
