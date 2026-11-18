import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import projectData from "./data/projectData";
import siteContent from "../content/siteContent";
import SectionTitle from "./SectionTitle";
import { cld, cldSrcSet } from "../utils/cloudinary";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Accordion of image panels. The active panel opens wide and shows its title;
 * the rest collapse to strips with a vertical label. A "View case" pill
 * trails the cursor over the open panel. On phones the strips stack vertically.
 */
const ProjectSection = () => {
  const { label, heading, allLabel, allHref, cta } = siteContent.projects;
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 350, damping: 30 });
  const py = useSpring(my, { stiffness: 350, damping: 30 });

  const onMove = (e) => {
    const r = wrapRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const all = (
    <a
      href={allHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-full border border-fg/20 py-2 pl-5 pr-2 text-[15px] font-medium transition-colors hover:border-accent"
    >
      {allLabel}
      <span className="grid h-8 w-8 place-items-center rounded-full bg-fg text-ground transition-transform duration-300 group-hover:rotate-45">↗</span>
    </a>
  );

  return (
    <section id="projects" className="section-y relative">
      <div className="wrap">
      <SectionTitle index={4} label={label} heading={heading} action={all} />

      <div
        ref={wrapRef}
        className="relative flex h-[max(40rem,110svh)] max-h-[52rem] flex-col gap-2 overflow-hidden md:h-[clamp(24rem,70vh,44rem)] md:max-h-none md:flex-row"
        onMouseMove={onMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {projectData.map((p, i) => {
          const open = active === i;
          return (
            <motion.a
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} — ${p.category}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={(e) => {
                // first tap on a touch screen opens the panel, second tap follows the link
                if (!open && window.matchMedia("(hover: none)").matches) {
                  e.preventDefault();
                  setActive(i);
                }
              }}
              className="group relative min-h-0 min-w-0 overflow-hidden rounded-md bg-surface"
              style={{ flex: open ? 5.2 : 1, transition: "flex 0.75s cubic-bezier(0.22, 1, 0.36, 1)" }}
              initial={reduce ? false : { opacity: 0, y: 60, clipPath: "inset(18% 0% 0% 0% round 6px)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 6px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
            >
              <img
                src={cld(p.image, 1200)}
                srcSet={cldSrcSet(p.image, [640, 960, 1400, 1800])}
                sizes="(min-width: 768px) 62vw, 100vw"
                alt=""
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-700 ease-out ${
                  open ? "scale-100 grayscale-0" : "scale-110 grayscale brightness-[0.6]"
                }`}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-60"}`} />

              <span className="absolute left-3 top-3 font-mono text-[11px] text-white/80">{String(i + 1).padStart(2, "0")}</span>

              {/* collapsed: vertical label (horizontal on phones) */}
              <span
                className={`absolute bottom-3 left-3 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-white/85 transition-opacity duration-300 md:origin-bottom-left md:-rotate-90 md:translate-x-[0.9rem] ${
                  open ? "opacity-0" : "opacity-100 delay-200"
                }`}
                aria-hidden="true"
              >
                {p.title}
              </span>

              {/* open: title + meta */}
              <div
                className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-4 text-white transition-[opacity,transform] duration-500 sm:p-5 ${
                  open ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-4 opacity-0"
                }`}
              >
                <div className="min-w-0">
                  <h3 className="truncate font-display text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium leading-none tracking-[-0.04em]">
                    {p.title}
                  </h3>
                  <p className="mt-3 hidden max-w-xl text-sm leading-relaxed text-white/70 lg:block">{p.description}</p>
                </div>
                <p className="shrink-0 text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-white/85">
                  {p.category}
                  {p.year && (
                    <>
                      <br />
                      {p.year}
                    </>
                  )}
                </p>
              </div>

              {/* touch screens: explicit link pill on the open panel */}
              <span className={`absolute right-3 top-3 rounded-full bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white md:hidden ${open ? "" : "hidden"}`}>
                {cta} ↗
              </span>
            </motion.a>
          );
        })}

        {/* cursor-follow pill (desktop) */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
            style={{ x: px, y: py }}
          >
            <AnimatePresence>
              {hovering && (
                <motion.span
                  className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white shadow-lg"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  {cta} ↗
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      </div>
    </section>
  );
};

export default ProjectSection;
