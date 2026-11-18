import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import experienceData from "./data/experienceData";
import siteContent from "../content/siteContent";
import SectionTitle from "./SectionTitle";

// Each card pins under the nav and shrinks a little as the next one slides over it.
const Card = ({ item, i, total, progress, reduce }) => {
  const end = 1 - (total - 1 - i) * 0.045;
  const scale = useTransform(progress, [i / total, 1], [1, end]);
  const current = i === 0;

  return (
    // stacking only from md up: on phones the cards are taller than the screen
    <div className="mb-6 sm:mb-10 md:[@media(min-height:720px)]:sticky" style={{ top: `calc(5.5rem + ${i * 1.1}rem)` }}>
      <motion.article
        style={reduce ? undefined : { scale, transformOrigin: "50% 0%" }}
        className="relative overflow-hidden rounded-3xl border border-fg/10 bg-surface p-6 shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.5)] sm:p-10"
      >
        <div className="grid gap-6 md:grid-cols-[11rem_1fr] md:gap-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg/50">
            <div className="flex items-center gap-2">
              {current && <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />}
              <span className={current ? "text-accent" : ""}>{item.period}</span>
            </div>
            <div className="mt-2 normal-case tracking-normal text-fg/40">{item.location}</div>
          </div>

          <div>
            <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {item.role}
            </h3>
            <p className="mt-1 text-lg text-fg/55">
              {item.companyHref ? (
                <a href={item.companyHref} target="_blank" rel="noopener noreferrer" className="underline decoration-fg/20 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
                  {item.company} ↗
                </a>
              ) : (
                item.company
              )}
            </p>

            <p className="mt-6 max-w-3xl leading-relaxed text-fg/80">{item.summary}</p>

            {item.points?.length > 0 && (
              <ul className="mt-5 max-w-3xl space-y-2 text-[15px] leading-relaxed text-fg/60">
                {item.points.map((p, k) => (
                  <li key={k} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-7 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="rounded-full border border-fg/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg/55">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[9rem] font-medium leading-none tracking-[-0.06em] text-fg/[0.04] sm:text-[12rem]">
          {String(i + 1).padStart(2, "0")}
        </span>
      </motion.article>
    </div>
  );
};

const Experience = () => {
  const { label, heading } = siteContent.experience;
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="experience" className="section-y relative">
      <div className="wrap">
        <SectionTitle index={2} label={label} heading={heading} />
        <div ref={ref}>
          {experienceData.map((item, i) => (
            <Card
              key={item.role}
              item={item}
              i={i}
              total={experienceData.length}
              progress={scrollYProgress}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
