import React from "react";
import educationData from "./data/educationData";
import siteContent from "../content/siteContent";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

const Education = () => {
  const { label, heading } = siteContent.education;

  return (
    <section id="education" className="section-y relative">
      <div className="wrap">
        <SectionTitle index={3} label={label} heading={heading} />

        <ol className="border-t border-fg/10">
          {educationData.map((item, i) => (
            <Reveal as="li" key={item.degree} delay={i * 90} className="group border-b border-fg/10">
              <div className="grid gap-3 py-8 transition-[padding] duration-500 ease-out md:grid-cols-[11rem_1.3fr_1fr] md:gap-10 md:py-10 md:group-hover:pl-4">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg/50">
                  {item.current && <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />}
                  <span className={item.current ? "text-accent" : ""}>{item.period}</span>
                </div>
                <div>
                  <h3 className="font-display text-[clamp(1.35rem,2.6vw,2.1rem)] font-medium leading-[1.1] tracking-[-0.03em] transition-colors group-hover:text-accent">
                    {item.degreeHref ? (
                      <a href={item.degreeHref} target="_blank" rel="noopener noreferrer">{item.degree}</a>
                    ) : (
                      item.degree
                    )}
                  </h3>
                  <p className="mt-1.5 text-fg/55">
                    <a href={item.institutionHref} target="_blank" rel="noopener noreferrer" className="underline decoration-fg/20 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
                      {item.institution} ↗
                    </a>{" "}
                    <span className="text-sm text-fg/40">· {item.location}</span>
                  </p>
                </div>
                <p className="leading-relaxed text-fg/60 md:pt-1">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Education;
