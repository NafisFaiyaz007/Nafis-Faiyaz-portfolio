import React from "react";
import siteContent from "../content/siteContent";
import Reveal from "./Reveal";
import RichText from "./RichText";
import { scrollToId } from "./Navbar";

const About = () => {
  const { about, documents, socials } = siteContent;

  return (
    <section id="about" className="section-y relative">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(16rem,1fr)_2.4fr] lg:gap-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">( 01 ) — {about.label}</p>
          <dl className="mt-8 border-t border-fg/10">
            {about.facts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-6 border-b border-fg/10 py-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg/45">{f.k}</dt>
                <dd className="text-right font-mono text-[11px] uppercase tracking-[0.12em]">
                  {f.href ? (
                    <a href={f.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                      {f.v} ↗
                    </a>
                  ) : (
                    f.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-display text-[clamp(1.8rem,3.4vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.035em]">
              <RichText parts={about.statement} />
            </p>
          </Reveal>

          <div className="mt-10 grid max-w-4xl gap-6 text-[17px] leading-relaxed text-fg/60 md:grid-cols-2 md:gap-10">
            {about.biography.map((para, i) => (
              <Reveal key={i} delay={100 + i * 100}>
                <p>
                  <RichText parts={para} linkClassName="text-fg/90" />
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={250} className="mt-12 flex flex-wrap items-center gap-3 text-[15px]">
            <a
              href={documents.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-fg py-2 pl-5 pr-2 font-medium text-ground transition-colors hover:bg-accent"
            >
              {about.primaryCta}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ground text-fg transition-transform duration-300 group-hover:rotate-45">↗</span>
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-fg/20 px-5 py-3 transition-colors hover:border-accent hover:text-accent"
            >
              {about.secondaryCta} ↗
            </a>
            <button
              onClick={() => scrollToId("contact")}
              className="px-3 py-3 text-fg/60 underline decoration-fg/25 underline-offset-4 transition-colors hover:text-accent"
            >
              {about.contactCta}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
