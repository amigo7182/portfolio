"use client";

import { useEffect, useRef } from "react";
import { useMode } from "../../context/ModeContext";
import { SECTION_LABELS } from "../../config/modeLabels";

const colors = {
  50:  "#f8f7f5",
  100: "#e6e1d7",
  200: "#c8b4a0",
  300: "#a89080",
  400: "#8a7060",
  500: "#6b5545",
  600: "#544237",
  700: "#3c4237",
  800: "#2a2e26",
  900: "#1a1d18",
};

// Machine-mode accent colour
const MACHINE_ACCENT = "#7ab8c8";

export function Component() {
  const { mode } = useMode();
  const isMachine  = mode === "machine";
  const gradientRef = useRef<HTMLDivElement>(null);

  // Word-entrance animation — runs once on mount (component remounts on mode change)
  useEffect(() => {
    const words = document.querySelectorAll<HTMLElement>(".word");
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        word.style.animation = "word-appear 0.8s ease-out forwards";
      }, delay);
    });

    const gradient = gradientRef.current;
    function onMouseMove(e: MouseEvent) {
      if (gradient) {
        gradient.style.left    = e.clientX - 192 + "px";
        gradient.style.top     = e.clientY - 192 + "px";
        gradient.style.opacity = "1";
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = "0";
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    words.forEach((word) => {
      word.addEventListener("mouseenter", () => {
        word.style.textShadow = isMachine
          ? "0 0 20px rgba(122, 184, 200, 0.5)"
          : "0 0 20px rgba(200, 180, 160, 0.5)";
      });
      word.addEventListener("mouseleave", () => {
        word.style.textShadow = "none";
      });
    });

    function onClick(e: MouseEvent) {
      const ripple = document.createElement("div");
      ripple.style.position    = "fixed";
      ripple.style.left        = e.clientX + "px";
      ripple.style.top         = e.clientY + "px";
      ripple.style.width       = "4px";
      ripple.style.height      = "4px";
      ripple.style.background  = isMachine
        ? "rgba(122, 184, 200, 0.6)"
        : "rgba(200, 180, 160, 0.6)";
      ripple.style.borderRadius  = "50%";
      ripple.style.transform     = "translate(-50%, -50%)";
      ripple.style.pointerEvents = "none";
      ripple.style.animation     = "pulse-glow 1s ease-out forwards";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    }
    document.addEventListener("click", onClick);

    let scrolled = false;
    function onScroll() {
      if (!scrolled) {
        scrolled = true;
        document.querySelectorAll<HTMLElement>(".floating-element").forEach((el, index) => {
          setTimeout(() => { el.style.animationPlayState = "running"; }, index * 200);
        });
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
    // isMachine used inside closures, no dep needed (component remounts on mode change)
  }, []);

  // ── Word data ──────────────────────────────────────────────────────────────
  const hw = SECTION_LABELS.hero;
  const accentColor = isMachine ? MACHINE_ACCENT : colors[200];
  const gridStroke  = isMachine ? "rgba(122,184,200,0.07)" : "rgba(200,180,160,0.08)";
  const bgGradient  = isMachine
    ? "from-[#0d1117] via-[#080c12] to-[#0d1a1f]"
    : "from-[#1a1d18] via-black to-[#2a2e26]";
  const mouseGradientBg = isMachine
    ? `radial-gradient(circle, ${MACHINE_ACCENT}0D 0%, transparent 100%)`
    : `radial-gradient(circle, ${colors[500]}0D 0%, transparent 100%)`;

  return (
    <div className="hero-shell">
      <div
        className={`min-h-screen bg-gradient-to-br ${bgGradient} text-[#e6e1d7] font-primary overflow-hidden relative w-full`}
      >
        {/* ── Background grid SVG ─────────────────────────────────────────── */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke={gridStroke}
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <line x1="0"   y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: "0.5s" }} />
          <line x1="0"   y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: "1s"   }} />
          <line x1="20%" y1="0"   x2="20%"  y2="100%" className="grid-line" style={{ animationDelay: "1.5s" }} />
          <line x1="80%" y1="0"   x2="80%"  y2="100%" className="grid-line" style={{ animationDelay: "2s"   }} />
          <line x1="50%" y1="0"   x2="50%"  y2="100%" className="grid-line" style={{ animationDelay: "2.5s", opacity: 0.05 }} />
          <line x1="0"   y1="50%" x2="100%" y2="50%"  className="grid-line" style={{ animationDelay: "3s",   opacity: 0.05 }} />
          <circle cx="20%" cy="20%" r="2"   className="detail-dot" style={{ animationDelay: "3s"   }} />
          <circle cx="80%" cy="20%" r="2"   className="detail-dot" style={{ animationDelay: "3.2s" }} />
          <circle cx="20%" cy="80%" r="2"   className="detail-dot" style={{ animationDelay: "3.4s" }} />
          <circle cx="80%" cy="80%" r="2"   className="detail-dot" style={{ animationDelay: "3.6s" }} />
          <circle cx="50%" cy="50%" r="1.5" className="detail-dot" style={{ animationDelay: "4s"   }} />
        </svg>

        {/* Corner elements */}
        <div className="corner-element top-8 left-8"   style={{ animationDelay: "4s"   }}><div className="absolute top-0 left-0 w-2 h-2 opacity-30"   style={{ background: accentColor }} /></div>
        <div className="corner-element top-8 right-8"  style={{ animationDelay: "4.2s" }}><div className="absolute top-0 right-0 w-2 h-2 opacity-30"  style={{ background: accentColor }} /></div>
        <div className="corner-element bottom-8 left-8" style={{ animationDelay: "4.4s" }}><div className="absolute bottom-0 left-0 w-2 h-2 opacity-30" style={{ background: accentColor }} /></div>
        <div className="corner-element bottom-8 right-8" style={{ animationDelay: "4.6s" }}><div className="absolute bottom-0 right-0 w-2 h-2 opacity-30" style={{ background: accentColor }} /></div>

        {/* Floating elements */}
        <div className="floating-element" style={{ top: "25%", left: "15%", animationDelay: "5s"   }} />
        <div className="floating-element" style={{ top: "60%", left: "85%", animationDelay: "5.5s" }} />
        <div className="floating-element" style={{ top: "40%", left: "10%", animationDelay: "6s"   }} />
        <div className="floating-element" style={{ top: "75%", left: "90%", animationDelay: "6.5s" }} />

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <div className="relative z-10 min-h-screen flex flex-col justify-between items-center px-8 py-12 md:px-16 md:py-20">

          {/* Top tagline */}
          <div className="text-center">
            <h2
              className="text-xs md:text-sm font-mono font-light uppercase tracking-[0.2em] opacity-80"
              style={{ color: accentColor }}
            >
              {hw.topTagline[mode].map((word, i) => (
                <span key={i} className="word" data-delay={String([0,200,400,600,800,1000,1200,1400][i])}>
                  {word}
                </span>
              ))}
            </h2>
            <div
              className="mt-4 w-16 h-px opacity-30"
              style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }}
            />
          </div>

          {/* Main headline */}
          <div className="text-center max-w-5xl mx-auto">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-extralight leading-tight tracking-tight"
              style={{ color: colors[50] }}
            >
              <div className="mb-4 md:mb-6">
                {hw.headline1[mode].map((word, i) => (
                  <span key={i} className="word" data-delay={String([1600,1750,1900,2050,2200,2350][i])}>
                    {word}
                  </span>
                ))}
              </div>
              <div
                className="text-2xl md:text-3xl lg:text-4xl font-thin leading-relaxed"
                style={{ color: accentColor }}
              >
                {hw.headline2[mode].map((word, i) => (
                  <span key={i} className="word" data-delay={String([2600,2750,2900,3050,3200,3350,3500,3650][i])}>
                    {word}
                  </span>
                ))}
              </div>
            </h1>
            {/* Side dashes */}
            <div className="absolute -left-8 top-1/2 w-4 h-px opacity-20" style={{ background: accentColor, animation: "word-appear 1s ease-out forwards", animationDelay: "3.5s" }} />
            <div className="absolute -right-8 top-1/2 w-4 h-px opacity-20" style={{ background: accentColor, animation: "word-appear 1s ease-out forwards", animationDelay: "3.7s" }} />
          </div>

          {/* Bottom tagline */}
          <div className="text-center">
            <div className="mb-4 w-16 h-px opacity-30" style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }} />
            <h2
              className="text-xs md:text-sm font-mono font-light uppercase tracking-[0.2em] opacity-80"
              style={{ color: accentColor }}
            >
              {hw.bottomTagline[mode].map((word, i) => (
                <span key={i} className="word" data-delay={String([4400,4550,4700,4850,5000,5150,5300][i])}>
                  {word}
                </span>
              ))}
            </h2>
            <div
              className="mt-6 flex justify-center space-x-4 opacity-0"
              style={{ animation: "word-appear 1s ease-out forwards", animationDelay: "5.5s" }}
            >
              <div className="w-1 h-1 rounded-full opacity-40" style={{ background: accentColor }} />
              <div className="w-1 h-1 rounded-full opacity-60" style={{ background: accentColor }} />
              <div className="w-1 h-1 rounded-full opacity-40" style={{ background: accentColor }} />
            </div>
          </div>
        </div>

        {/* Mouse-follow gradient */}
        <div
          id="mouse-gradient"
          ref={gradientRef}
          className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0"
          style={{ background: mouseGradientBg }}
        />
      </div>
    </div>
  );
}
