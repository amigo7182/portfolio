"use client";

import { useState, useEffect } from "react";
import { useMode } from "../../context/ModeContext";
import { NAV_LABELS } from "../../config/modeLabels";
import { ModeToggle } from "./mode-toggle";

const LINKS = [
  { label: "Work",       href: "#projects"   },
  { label: "About",      href: "#about"      },
  { label: "Education",  href: "#education"  },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export function Navbar() {
  const { mode } = useMode();
  const [scrolled, setScrolled]   = useState(false);
  const [open,     setOpen]       = useState(false);
  const [active,   setActive]     = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["contact", "experience", "about", "projects"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#1a1d18]/90 backdrop-blur-md border-b border-[rgba(200,180,160,0.07)]"
            : "py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 md:px-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className={`font-mono text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
              mode === "machine" ? "text-[#7ab8c8] hover:text-[#a8d8e8]" : "text-[#c8b4a0] hover:text-[#f8f7f5]"
            }`}
          >
            Amirkhan Assetov
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-10">
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={`font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${
                      active === href.slice(1)
                        ? mode === "machine" ? "text-[#7ab8c8]" : "text-[#f8f7f5]"
                        : mode === "machine"
                          ? "text-[#5a8a98] hover:text-[#7ab8c8]"
                          : "text-[#c8b4a0] hover:text-[#e6e1d7]"
                    }`}
                  >
                    {NAV_LABELS[label]?.[mode] ?? label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Resume button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-mono text-xs uppercase tracking-[0.15em] px-4 py-1.5 border transition-colors duration-200 ${
                mode === "machine"
                  ? "border-[rgba(122,184,200,0.4)] text-[#7ab8c8] hover:border-[rgba(122,184,200,0.8)] hover:text-[#a8d8e8]"
                  : "border-[rgba(200,180,160,0.4)] text-[#c8b4a0] hover:border-[rgba(200,180,160,0.8)] hover:text-[#f8f7f5]"
              }`}
            >
              {mode === "machine" ? "/resume.pdf" : "Resume"}
            </a>

            {/* Mode toggle — desktop */}
            <ModeToggle />
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <ModeToggle />
            <button
              className="flex flex-col gap-[5px] cursor-pointer p-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className={`block w-5 h-px bg-[#c8b4a0] transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block w-5 h-px bg-[#c8b4a0] transition-all duration-200 ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-5 h-px bg-[#c8b4a0] transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#1a1d18] flex flex-col items-center justify-center gap-10 md:hidden transition-all duration-400 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={() => setOpen(false)}
            className={`font-mono text-2xl uppercase tracking-[0.3em] transition-colors duration-200 ${
              mode === "machine"
                ? "text-[#7ab8c8] hover:text-[#a8d8e8]"
                : "text-[#c8b4a0] hover:text-[#f8f7f5]"
            }`}
          >
            {NAV_LABELS[label]?.[mode] ?? label}
          </a>
        ))}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className={`font-mono text-2xl uppercase tracking-[0.3em] px-6 py-2 border transition-colors duration-200 ${
            mode === "machine"
              ? "border-[rgba(122,184,200,0.4)] text-[#7ab8c8] hover:border-[rgba(122,184,200,0.8)]"
              : "border-[rgba(200,180,160,0.4)] text-[#c8b4a0] hover:border-[rgba(200,180,160,0.8)] hover:text-[#f8f7f5]"
          }`}
        >
          {mode === "machine" ? "/resume.pdf" : "Resume"}
        </a>
      </div>
    </>
  );
}
