"use client";

import { useRef, useEffect, useState } from "react";
import { useMode } from "../../context/ModeContext";
import { SECTION_LABELS } from "../../config/modeLabels";

const SOCIAL = [
  {
    label: "GitHub",
    href: "https://github.com/amigo7182",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013.01-.4c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/amirkhan-assetov/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com/a_assetov",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function ContactSection() {
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

  const L = SECTION_LABELS.contact;
  const accentText    = isMachine ? "text-[#7ab8c8]"                  : "text-[#c8b4a0]";
  const dimText       = isMachine ? "text-[#5a8a98]"                  : "text-[#8a7060]";
  const emailBorder   = isMachine ? "border-[rgba(122,184,200,0.25)]  hover:border-[rgba(122,184,200,0.6)]" : "border-[rgba(200,180,160,0.25)] hover:border-[rgba(200,180,160,0.6)]";
  const footerBorder  = isMachine ? "border-[rgba(122,184,200,0.07)]" : "border-[rgba(200,180,160,0.07)]";

  return (
    <section className="w-full bg-[#1a1d18] py-24 md:py-40 text-left">
      <div ref={ref} className="max-w-6xl mx-auto px-8 md:px-16">

        {/* Label */}
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className={`font-mono text-xs uppercase tracking-[0.2em] opacity-60 mb-4 transition-colors duration-300 ${accentText}`}>
            {L.eyebrow[mode]}
          </p>
          <div className={`w-8 h-px mb-10 transition-colors duration-300 ${isMachine ? "bg-[rgba(122,184,200,0.3)]" : "bg-[rgba(200,180,160,0.3)]"}`} />
        </div>

        {/* Big heading */}
        <h2
          className={`text-5xl md:text-7xl lg:text-8xl font-extralight text-[#f8f7f5] tracking-tight leading-none mb-12 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {L.headingLine1[mode]}
          <br />
          <span className={`transition-colors duration-300 ${accentText}`}>
            {L.headingLine2[mode]}
          </span>
        </h2>

        {/* Email */}
        <a
          href="mailto:assetov.a@northeastern.edu"
          className={`inline-block font-mono text-sm md:text-base border-b pb-0.5 tracking-wider transition-all duration-200 mb-16 cursor-pointer transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } ${accentText} ${emailBorder}`}
        >
          {isMachine ? "MAILTO:assetov.a@northeastern.edu" : "assetov.a@northeastern.edu"}
        </a>

        {/* Social icons + Resume */}
        <div
          className={`flex items-center gap-8 transition-all duration-700 delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {SOCIAL.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`transition-colors duration-200 cursor-pointer ${
                isMachine
                  ? "text-[#4a7a8a] hover:text-[#7ab8c8]"
                  : "text-[#8a7060] hover:text-[#c8b4a0]"
              }`}
            >
              {icon}
            </a>
          ))}

          {/* Resume download */}
          <a
            href="/resume.pdf"
            download="Amirkhan_Assetov_Resume.pdf"
            className={`font-mono text-xs uppercase tracking-[0.15em] px-4 py-1.5 border transition-colors duration-200 ${
              isMachine
                ? "border-[rgba(122,184,200,0.4)] text-[#7ab8c8] hover:border-[rgba(122,184,200,0.8)] hover:text-[#a8d8e8]"
                : "border-[rgba(200,180,160,0.4)] text-[#c8b4a0] hover:border-[rgba(200,180,160,0.8)] hover:text-[#f8f7f5]"
            }`}
          >
            {isMachine ? "↓ resume.pdf" : "↓ Resume"}
          </a>
        </div>

        {/* Footer */}
        <div
          className={`mt-24 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-700 delay-500 border-t ${
            inView ? "opacity-100" : "opacity-0"
          } ${footerBorder}`}
        >
          <p className={`font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${dimText}`}>
            © {new Date().getFullYear()} Amirkhan Assetov
          </p>
          <p className={`font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${dimText}`}>
            {SECTION_LABELS.footer.credit[mode]}
          </p>
        </div>
      </div>
    </section>
  );
}
