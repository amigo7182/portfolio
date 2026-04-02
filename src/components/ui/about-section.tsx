"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatedHeading } from "./animated-heading";
import { useMode } from "../../context/ModeContext";
import { SECTION_LABELS } from "../../config/modeLabels";

const SKILLS = [
  { category: "Languages", items: ["Python", "JavaScript", "Java", "C++", "Dart"] },
  { category: "Backend",   items: ["FastAPI", "REST APIs", "PostgreSQL", "MySQL"] },
  { category: "Frontend",  items: ["React", "JavaScript", "HTML / CSS"] },
  { category: "Tools",     items: ["Git", "Docker", "Heroku", "Postman", "VS Code"] },
];

export function AboutSection() {
  const { mode }   = useMode();
  const isMachine  = mode === "machine";
  const ref        = useRef<HTMLDivElement>(null);
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

  const L = SECTION_LABELS.about;
  const accentText   = isMachine ? "text-[#7ab8c8]"               : "text-[#c8b4a0]";
  const skillBorder  = isMachine ? "border-[rgba(122,184,200,0.15)]" : "border-[rgba(200,180,160,0.12)]";
  const skillHoverBorder = isMachine
    ? "hover:border-[rgba(122,184,200,0.35)] hover:text-[#a8d8e8]"
    : "hover:border-[rgba(200,180,160,0.3)] hover:text-[#e6e1d7]";

  return (
    <section className="w-full bg-[#1a1d18] py-24 md:py-32 text-left">
      <div ref={ref} className="max-w-6xl mx-auto px-8 md:px-16">

        {/* Label */}
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className={`font-mono text-xs uppercase tracking-[0.2em] opacity-60 mb-4 transition-colors duration-300 ${accentText}`}>
            {L.eyebrow[mode]}
          </p>
          <div className={`w-8 h-px mb-10 transition-colors duration-300 ${isMachine ? "bg-[rgba(122,184,200,0.3)]" : "bg-[rgba(200,180,160,0.3)]"}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Bio */}
          <div className={`transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <AnimatedHeading className="text-4xl md:text-5xl font-extralight text-[#f8f7f5] tracking-tight mb-8 leading-tight">
              {L.heading[mode]}
            </AnimatedHeading>
            <div className="space-y-5 text-[#a89080] font-light leading-relaxed text-sm md:text-base">
              <p>
                I'm a Computer Science student at Northeastern University, originally from
                Almaty, Kazakhstan. I work across the full stack — building production backend
                systems in Python and FastAPI, and crafting frontend interfaces in React and
                JavaScript.
              </p>
              <p>
                Across two internships I shipped APIs handling 50k+ daily requests at Arbuz.kz
                and optimized a frontend used by thousands of daily users at Freedom.kz.
              </p>
              <p>
                I come from a competitive mathematics background — Gold at the Asian International
                Mathematics Olympiad and Silver at the American Math Competition. That same
                systematic rigour shapes how I approach engineering problems.
              </p>
            </div>

            {/* Location / status line */}
            <div className="mt-10 flex items-center gap-4">
              <div className={`w-8 h-px transition-colors duration-300 ${isMachine ? "bg-[rgba(122,184,200,0.2)]" : "bg-[rgba(200,180,160,0.2)]"}`} />
              <span className={`font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${isMachine ? "text-[#5a8a98]" : "text-[#8a7060]"}`}>
                {L.location[mode]}
              </span>
            </div>
          </div>

          {/* Skills */}
          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h3 className="text-xl font-extralight text-[#f8f7f5] mb-8 tracking-tight">
              {isMachine ? "// tech.stack" : "Technical Skills"}
            </h3>
            <div className="space-y-7">
              {SKILLS.map((group, i) => (
                <div
                  key={group.category}
                  className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: inView ? `${300 + i * 80}ms` : "0ms" }}
                >
                  <p className={`font-mono text-xs uppercase tracking-[0.2em] mb-3 transition-colors duration-300 ${isMachine ? "text-[#5a8a98]" : "text-[#8a7060]"}`}>
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className={`font-mono text-xs ${accentText} border ${skillBorder} px-3 py-1 ${skillHoverBorder} transition-all duration-200 cursor-default`}
                      >
                        {skill}
                      </span>
                    ))}
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
