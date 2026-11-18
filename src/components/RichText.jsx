import React from "react";

/** Renders ["text", { t, href }, ...] — link segments open the organisation's site. */
const RichText = ({ parts, linkClassName = "" }) =>
  parts.map((p, i) =>
    typeof p === "string" ? (
      <React.Fragment key={i}>{p}</React.Fragment>
    ) : (
      <a
        key={i}
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`underline decoration-fg/25 decoration-1 underline-offset-[0.18em] transition-colors hover:text-accent hover:decoration-accent ${linkClassName}`}
      >
        {p.t}
      </a>
    )
  );

export default RichText;
