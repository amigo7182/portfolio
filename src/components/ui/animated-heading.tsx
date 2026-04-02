"use client";

import { useState, useEffect } from "react";

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Milliseconds between each letter appearing */
  letterDelay?: number;
  /** Milliseconds all letters stay visible before resetting */
  holdDuration?: number;
}

export function AnimatedHeading({
  children,
  className = "",
  as: Tag = "h2",
  letterDelay = 55,
  holdDuration = 2500,
}: AnimatedHeadingProps) {
  const chars = children.split("");
  const [cycle, setCycle] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    // Last character index drives the total cycle time
    const totalTime = (chars.length - 1) * letterDelay + 800 + holdDuration;
    const t = setTimeout(() => setCycle((c) => c + 1), totalTime);
    return () => clearTimeout(t);
  }, [cycle, chars.length, letterDelay, holdDuration, reduced]);

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={className}>
      {chars.map((char, i) =>
        char === " " ? (
          // Space: invisible spacer, still participates in delay sequence
          <span
            key={`${cycle}-sp-${i}`}
            style={{ display: "inline-block", width: "0.28em" }}
          />
        ) : (
          <span
            key={`${cycle}-${i}`}
            style={{
              display: "inline-block",
              opacity: 0,
              animation: "word-appear 0.8s ease-out forwards",
              animationDelay: `${i * letterDelay}ms`,
            }}
          >
            {char}
          </span>
        )
      )}
    </Tag>
  );
}
