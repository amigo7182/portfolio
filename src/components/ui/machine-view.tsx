"use client";

import { useState } from "react";

/* ── Portfolio schema ───────────────────────────────────────────────────── */
const PORTFOLIO: Record<string, unknown> = {
  meta: {
    schema_version: "1.1",
    last_updated: "2026-04-05",
    canonical_url: "https://amirkhanassetov.com",
    content_type: "candidate_profile",
  },

  candidate: {
    name: "Amirkhan Assetov",
    title: "Software Engineer",
    location: {
      city: "Boston",
      state: "MA",
      country: "US",
    },
    summary:
      "CS student at Northeastern University (Boston, MA), originally from Almaty, Kazakhstan. Full-stack focus: production backend systems in Python and FastAPI, frontend interfaces in React and JavaScript. Shipped APIs handling 50k+ daily requests at Arbuz.kz; optimised a frontend serving thousands of daily users at Freedom.kz. Competitive mathematics background: Gold at the Asian International Mathematics Olympiad (2022), Silver at the American Mathematics Competition (2024) — the same systematic rigour applied to engineering.",
    work_authorization: "F-1 student visa, CPT/OPT eligible",
    languages_spoken: ["English", "Russian", "Kazakh"],
    availability: {
      status: "open",
      types: ["co-op", "internship"],
      earliest_start: "2026-09",
      preferred_duration_months: 6,
      remote_ok: true,
    },
    contact: {
      email: "assetov.a@northeastern.edu",
      phone: "+1-215-667-1397",
      website: "https://amirkhanassetov.com",
      github: "https://github.com/amigo7182",
      linkedin: "https://www.linkedin.com/in/amirkhan-assetov",
      twitter: "https://x.com/a_assetov",
      resume: "https://amirkhanassetov.com/resume.pdf",
    },
  },

  education: [
    {
      institution: "Northeastern University",
      degree: "B.S. Computer Science",
      location: { city: "Boston", state: "MA", country: "US" },
      gpa: 3.56,
      gpa_scale: 4.0,
      period: { start: "2025-09", end_expected: "2028-05" },
      graduation_year: 2028,
    },
  ],

  experience: [
    {
      role: "Backend Developer Intern",
      employment_type: "internship",
      company: "Arbuz.kz",
      company_url: "https://arbuz.kz",
      industry: "e-commerce",
      location: { city: "Almaty", country: "KZ" },
      period: { start: "2025-06", end: "2025-08" },
      status: "completed",
      highlights: [
        "Delivery cost calculation service — routing logic optimised, delivery time estimates -21%",
        "Product recommendation service using behaviour data — avg basket size +14%",
        "Order processing microservice with async workflows (RabbitMQ) — throughput +29%",
        "RESTful APIs (FastAPI/Flask) — avg response time -25%",
      ],
      stack: ["Python", "FastAPI", "Flask", "PostgreSQL", "MySQL", "RabbitMQ", "OpenAPI"],
    },
    {
      role: "Frontend Developer Intern",
      employment_type: "internship",
      company: "Freedom.kz",
      company_url: "https://freedom.kz",
      industry: "fintech",
      location: { city: "Almaty", country: "KZ" },
      period: { start: "2024-06", end: "2024-08" },
      status: "completed",
      highlights: [
        "Frontend components integrated with backend APIs — 1k+ daily active users, 10+ core features",
        "API contracts defined with backend engineers — integration issues -27%",
        "State management optimised, redundant network calls removed — page load time -25%",
      ],
      stack: ["JavaScript", "React", "REST APIs", "CSS"],
    },
  ],

  projects: [
    {
      title: "Distributed Backend Service",
      category: "backend",
      year: 2025,
      status: "deployed",
      live_url: null,
      repo_url: null,
      repo_visibility: "private",
      description:
        "RESTful API with JWT auth and role-based access control over a normalised PostgreSQL schema. Containerised with Docker, deployed to Heroku with sub-100ms avg response time.",
      highlights: [
        "JWT-based auth + role-based access control (admin/user)",
        "Normalised PostgreSQL schema, full CRUD lifecycle",
        "Schema evolution via Alembic migrations",
        "Docker containerised, Heroku deployed, sub-100ms avg response time",
      ],
      stack: ["Python", "FastAPI", "PostgreSQL", "Alembic", "Docker", "Heroku"],
    },
    {
      title: "AI Email Processing System",
      category: "fullstack",
      year: 2025,
      status: "deployed",
      live_url: null,
      repo_url: null,
      repo_visibility: "private",
      description:
        "Full-stack pipeline that summarises email threads and extracts key highlights. React frontend → Node.js API → AI model → Supabase.",
      highlights: [
        "REST endpoints: /summarize, /emails, /auth with clean separation of concerns",
        "Supabase auth with protected routes and session handling",
        "Async UI patterns prevent freeze during model inference",
        "Relational data model: user → email threads → generated summaries",
      ],
      stack: ["React", "Node.js", "JavaScript", "Supabase", "PostgreSQL"],
    },
    {
      title: "Customer Service Automation Bot",
      category: "automation",
      year: 2024,
      status: "active",
      live_url: null,
      repo_url: null,
      repo_visibility: "private",
      description:
        "Python bot for one of Kazakhstan's largest petrol station networks. Rule-based NLP intent classifier with smart routing to auto-response or human escalation. $10,000+/year operational savings.",
      highlights: [
        "Rule-based NLP intent classifier — reliability prioritised over ML overhead",
        "Smart routing: auto-response or human escalation",
        "High-volume inquiry handling with edge-case fallbacks",
        "Operational savings: $10,000+/year",
      ],
      stack: ["Python"],
    },
    {
      title: "Arduino Rehabilitation Device",
      category: "embedded",
      year: 2024,
      status: "tested",
      live_url: null,
      repo_url: null,
      repo_visibility: "private",
      description:
        "Hardware + software system for finger motor recovery post-injury or neurological damage. Tested with real patients in hospitals in Almaty, Kazakhstan.",
      highlights: [
        "Real-time feedback loop: flex sensor → Arduino → actuator assist/resist",
        "Low-level C++ for deterministic real-time processing — no OS latency",
        "Analog sensor input (pressure, flex) converted to precise motor commands",
        "Validated with real patients in Almaty hospitals",
      ],
      stack: ["Arduino", "C++"],
    },
  ],

  skills: {
    languages: ["Python", "JavaScript", "Java", "C++", "Dart"],
    backend: ["FastAPI", "Flask", "Node.js", "PostgreSQL", "MySQL", "RabbitMQ"],
    frontend: ["React", "HTML", "CSS"],
    tools: ["Git", "Docker", "Heroku", "Postman", "VS Code"],
    concepts: ["Microservices", "Async Workflows", "Role-Based Auth", "NLP", "REST", "ORM"],
  },

  awards: [
    {
      title: "Silver Medal",
      event: "American Mathematics Competition (AMC 12)",
      year: 2024,
    },
    {
      title: "Gold Medal",
      event: "Asian International Mathematics Olympiad (AIMO)",
      year: 2022,
    },
  ],
};

/* ── JSON syntax highlighter ───────────────────────────────────────────── */
function highlight(json: string): string {
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) return `<span class="json-key">${match}</span>`;
        return `<span class="json-str">${match}</span>`;
      }
      if (/true|false/.test(match)) return `<span class="json-bool">${match}</span>`;
      if (/null/.test(match))       return `<span class="json-null">${match}</span>`;
      return `<span class="json-num">${match}</span>`;
    }
  );
}

/* ── Component ─────────────────────────────────────────────────────────── */
export function MachineView() {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(PORTFOLIO, null, 2);

  function copy() {
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <style>{`
        .json-key  { color: #79b8ff; }
        .json-str  { color: #9ecbff; }
        .json-num  { color: #f8c555; }
        .json-bool { color: #56d364; }
        .json-null { color: #ff7b72; }
      `}</style>

      <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono pt-20 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">

          {/* Request */}
          <div className="pt-10 pb-6 border-b border-[rgba(255,255,255,0.06)]">
            <p className="text-xs text-[#3d444d] mb-1">REQUEST</p>
            <p className="text-sm">
              <span className="text-[#56d364]">GET</span>
              <span className="text-[#79b8ff] ml-2">/api/portfolio</span>
              <span className="text-[#3d444d] ml-2">HTTP/1.1</span>
            </p>
            <p className="text-xs text-[#3d444d] mt-1">
              Accept: application/json &nbsp;·&nbsp; Host: amirkhanassetov.com
            </p>
          </div>

          {/* Response */}
          <div className="py-4 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
            <div>
              <p className="text-xs text-[#3d444d] mb-1">RESPONSE</p>
              <p className="text-sm">
                <span className="text-[#56d364]">200 OK</span>
                <span className="text-[#3d444d] ml-3">Content-Type: application/json</span>
              </p>
            </div>
            <button
              onClick={copy}
              className="text-xs border border-[rgba(255,255,255,0.08)] px-3 py-1.5 text-[#3d444d] hover:text-[#c9d1d9] hover:border-[rgba(255,255,255,0.18)] transition-colors duration-150 cursor-pointer"
            >
              {copied ? "copied ✓" : "copy json"}
            </button>
          </div>

          {/* Body */}
          <pre
            className="pt-8 text-xs leading-6 overflow-x-auto text-[#3d444d] whitespace-pre"
            dangerouslySetInnerHTML={{ __html: highlight(json) }}
          />

        </div>
      </div>
    </>
  );
}
