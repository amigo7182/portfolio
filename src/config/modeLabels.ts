import type { Mode } from "../context/ModeContext";

export type ModeCopy = Record<Mode, string>;

// ── Navigation ───────────────────────────────────────────────────────────────
// Keys match the `label` field in the Navbar LINKS array
export const NAV_LABELS: Record<string, ModeCopy> = {
  Work:       { human: "Work",       machine: "/builds"   },
  About:      { human: "About",      machine: "/identity" },
  Education:  { human: "Education",  machine: "/training" },
  Experience: { human: "Experience", machine: "/runtime"  },
  Contact:    { human: "Contact",    machine: "/transmit" },
};

// ── Section-level labels ─────────────────────────────────────────────────────
export const SECTION_LABELS = {
  projects: {
    eyebrow:   { human: "Selected Work",  machine: "// active builds" } as ModeCopy,
    heading:   { human: "Projects",       machine: "/builds"           } as ModeCopy,
    cardCta:   { human: "View details",   machine: "Access node"       } as ModeCopy,
    liveLabel: { human: "Live",           machine: "Deploy"            } as ModeCopy,
  },

  about: {
    eyebrow:  { human: "Background",                                    machine: "// sys.identity"        } as ModeCopy,
    heading:  { human: "About Me",                                      machine: "/identity"               } as ModeCopy,
    location: { human: "Boston, MA — Open to Co-op & Internships",      machine: "NODE=Boston,MA · STATUS=AVAILABLE" } as ModeCopy,
  },

  experience: {
    eyebrow: { human: "Career",     machine: "// exec.log" } as ModeCopy,
    heading: { human: "Experience", machine: "/runtime"    } as ModeCopy,
  },

  education: {
    eyebrow: { human: "Academic",  machine: "// train.data" } as ModeCopy,
    heading: { human: "Education", machine: "/training"      } as ModeCopy,
  },

  contact: {
    eyebrow:      { human: "Get in touch", machine: "// open.channel" } as ModeCopy,
    headingLine1: { human: "Let's work",   machine: "Initialize"       } as ModeCopy,
    headingLine2: { human: "together.",    machine: "contact."          } as ModeCopy,
  },

  // Hero words are grouped into arrays so counts stay identical between modes.
  // Each sub-array maps 1-to-1 with the .word spans and their data-delay values.
  hero: {
    // 8 spans — delays: 0, 200, 400, 600, 800, 1000, 1200, 1400
    topTagline: {
      human:   ["Amirkhan", "Assetov", "—", "CS",           "Student",  "&",          "Software",  "Engineer."],
      machine: ["Amirkhan", "Assetov", "—", "sys.engineer", "·",        "build:2025", "·",         "active"],
    } as Record<Mode, string[]>,

    // 6 spans — delays: 1600, 1750, 1900, 2050, 2200, 2350
    headline1: {
      human:   ["Turning", "complex", "problems", "into", "clean",   "solutions."],
      machine: ["Parsing", "complex", "inputs",   "into", "optimal", "outputs."],
    } as Record<Mode, string[]>,

    // 8 spans — delays: 2600, 2750, 2900, 3050, 3200, 3350, 3500, 3650
    headline2: {
      human:   ["From",     "scalable", "backend", "APIs",   "to",  "polished", "user",  "interfaces."],
      machine: ["Runtime:", "Python",   "·",       "FastAPI","·",   "React",    "·",     "production."],
    } as Record<Mode, string[]>,

    // 7 spans — delays: 4400, 4550, 4700, 4850, 5000, 5150, 5300
    bottomTagline: {
      human:   ["Python,", "FastAPI,", "React,", "JavaScript", "—", "Boston,", "MA."],
      machine: ["NODE:",   "Python,",  "FastAPI,","React",     "—", "Boston,", "MA."],
    } as Record<Mode, string[]>,
  },

  footer: {
    credit: { human: "Built with React + Tailwind", machine: "Compiled · React + Tailwind" } as ModeCopy,
  },
};
