import React from "react";
import Reveal from "./Reveal";

/**
 * "( 03 ) — SELECTED WORK" in accent mono, then a one-line Geist headline
 * whose second half is set in the accent colour. `action` sits on the right.
 */
const SectionTitle = ({ index, label, heading = [], action = null, className = "" }) => (
  <div className={`mb-12 sm:mb-16 ${className}`}>
    <Reveal>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
        ( {String(index).padStart(2, "0")} ) — {label}
      </p>
    </Reveal>
    {heading.length > 0 && (
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={80}>
          <h2 className="font-display text-[clamp(2.4rem,6vw,5.25rem)] font-medium leading-[1] tracking-[-0.045em]">
            {heading.map((line, i) => (
              <span key={i} className={i > 0 ? "text-accent" : ""}>
                {i > 0 ? " " : ""}
                {line}
              </span>
            ))}
          </h2>
        </Reveal>
        {action && <Reveal delay={160}>{action}</Reveal>}
      </div>
    )}
  </div>
);

export default SectionTitle;
