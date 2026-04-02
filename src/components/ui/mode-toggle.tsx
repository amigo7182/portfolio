import { useMode } from "../../context/ModeContext";

/**
 * Pill-style toggle between Human and Machine modes.
 * Uses a sliding background indicator and per-side accent colors.
 * Fully keyboard accessible (role="switch", aria-checked).
 */
export function ModeToggle() {
  const { mode, toggleMode } = useMode();
  const isMachine = mode === "machine";

  return (
    <button
      role="switch"
      aria-checked={isMachine}
      aria-label={`Switch to ${isMachine ? "Human" : "Machine"} mode`}
      onClick={toggleMode}
      className={`
        relative inline-flex items-center h-[26px] rounded-full overflow-hidden cursor-pointer
        border transition-[border-color,box-shadow] duration-300
        focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1
        focus-visible:ring-offset-[#1a1d18]
        ${isMachine
          ? "border-[rgba(122,184,200,0.3)] focus-visible:ring-[rgba(122,184,200,0.5)]"
          : "border-[rgba(200,180,160,0.2)] focus-visible:ring-[rgba(200,180,160,0.4)]"
        }
      `}
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {/* ── Sliding indicator ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 w-1/2 transition-[left,background] duration-300 ease-in-out rounded-full"
        style={{
          left: isMachine ? "50%" : "0%",
          background: isMachine
            ? "rgba(122,184,200,0.1)"
            : "rgba(200,180,160,0.08)",
        }}
      />

      {/* ── Human label ───────────────────────────────────────────── */}
      <span
        className={`
          relative z-10 px-3.5 font-mono text-[9px] uppercase tracking-[0.18em] leading-none
          transition-colors duration-300 select-none
          ${!isMachine ? "text-[#e6e1d7]" : "text-[#8a7060]"}
        `}
      >
        Human
      </span>

      {/* ── Separator ─────────────────────────────────────────────── */}
      <span
        aria-hidden="true"
        className="relative z-10 font-mono text-[10px] select-none"
        style={{ color: "rgba(200,180,160,0.18)" }}
      >
        |
      </span>

      {/* ── Machine label ─────────────────────────────────────────── */}
      <span
        className={`
          relative z-10 px-3.5 font-mono text-[9px] uppercase tracking-[0.18em] leading-none
          transition-colors duration-300 select-none
          ${isMachine ? "text-[#7ab8c8]" : "text-[#8a7060]"}
        `}
      >
        Machine
      </span>
    </button>
  );
}
