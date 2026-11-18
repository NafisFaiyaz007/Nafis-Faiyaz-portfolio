import React, { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import siteContent from "../content/siteContent";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { scrollToId } from "./Navbar";

/** The name "signs" itself: an accent stroke traces the letters, then they fill in. */
const Signature = ({ text }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const drawn = reduce || seen;

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className="block w-full overflow-visible"
      style={{ height: "clamp(5rem, 13vw, 12.5rem)" }}
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontFamily: '"Instrument Serif", Georgia, serif',
          fontStyle: "italic",
          fontSize: "clamp(3.75rem, 10.4vw, 10rem)",
          letterSpacing: "-0.02em",
          fill: "rgb(var(--fg))",
          fillOpacity: drawn ? 1 : 0,
          stroke: "rgb(var(--accent))",
          strokeWidth: 1.2,
          strokeOpacity: drawn ? 0 : 1,
          strokeDasharray: 1600,
          strokeDashoffset: drawn ? 0 : 1600,
          transition: reduce
            ? "none"
            : "stroke-dashoffset 2.4s cubic-bezier(0.65, 0, 0.35, 1), fill-opacity 0.96s 1.92s, stroke-opacity 0.96s 2.4s",
        }}
      >
        {text}
      </text>
    </svg>
  );
};

const Marquee = ({ items }) => (
  <div className="overflow-hidden py-4 sm:py-6">
    <div className="marquee" style={{ "--marquee-speed": "38s" }}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {items.map((it) => (
            <span key={it.t} className="flex items-center whitespace-nowrap">
              <span
                className={`text-[clamp(1.9rem,4.4vw,4.25rem)] leading-none ${
                  it.serif ? "font-serif italic" : "font-display font-medium tracking-[-0.04em]"
                }`}
              >
                {it.t}
              </span>
              <span className="mx-6 font-display text-[clamp(1.9rem,4.4vw,4.25rem)] leading-none text-accent sm:mx-10">*</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const Footer = () => {
  const { contact, footer, socials, navbar, documents, profile } = siteContent;

  const elsewhere = [
    { label: "LinkedIn", href: socials.linkedin },
    { label: "Résumé (PDF)", href: documents.resume },
    { label: "GitHub", href: socials.github },
    { label: "Facebook", href: socials.facebook },
  ];

  const colTitle = "mb-4 font-mono text-[11px] uppercase tracking-[0.14em] opacity-50";
  const linkCls = "block py-1 text-[15px] transition-colors hover:text-accent";

  return (
    <footer id="contact" className="relative">
      {/* centred sign-off band */}
      <div className="border-t border-fg/10 pt-24 sm:pt-28 lg:pt-[7.5rem]">
        <div className="wrap flex flex-col items-center text-center">
          <Signature text={profile.name.replace("Chowdhury ", "")} />
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fg/50">{contact.signoff}</p>
        </div>
        <div className="mt-8 border-t border-fg/10">
          <Marquee items={contact.marquee} />
        </div>
      </div>

      {/* inverted "next step" panel */}
      <div className="bg-fg pb-8 pt-20 text-ground sm:pt-24">
        <div className="wrap">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">( {contact.label} )</p>
          </Reveal>

          <h2 className="mt-8 font-display text-[clamp(2.4rem,6.4vw,6.5rem)] font-normal leading-[1] tracking-[-0.045em]">
            {contact.heading.map((line, i) => (
              <span key={line} className="block">
                <SplitText text={line} inView delay={i * 0.1} stagger={0.02} />
              </span>
            ))}
          </h2>

          <Reveal delay={150}>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex max-w-full items-baseline gap-3 font-serif text-[clamp(1.5rem,3.6vw,3rem)] italic leading-tight transition-colors hover:text-accent"
            >
              <span className="min-w-0 break-all sm:break-normal">{profile.email}</span>
              <span className="not-italic transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
            </a>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ground/25 pt-8 md:grid-cols-[1fr_1fr_1fr_auto]">
            <div>
              <p className={colTitle}>Index</p>
              {navbar.links.map((l, i) => (
                <button key={l.id} onClick={() => scrollToId(l.id)} className={`${linkCls} text-left ${i === 0 ? "text-accent" : ""}`}>
                  {l.label}
                </button>
              ))}
            </div>
            <div>
              <p className={colTitle}>Elsewhere</p>
              {elsewhere.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {l.label}
                </a>
              ))}
            </div>
            <div>
              <p className={colTitle}>Based in</p>
              {footer.basedIn.map((b) => (
                <p key={b} className="py-1 text-[15px]">{b}</p>
              ))}
            </div>
            <div className="flex items-start md:justify-end">
              <button
                onClick={() => scrollToId("top")}
                aria-label="Back to top"
                className="grid h-12 w-12 place-items-center rounded-full border border-ground/40 transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                ↑
              </button>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.14em] opacity-60 md:flex-row md:justify-between">
            <span>&copy; {new Date().getFullYear()} {footer.rightsPrefix}</span>
            <span>{footer.motionNote}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
