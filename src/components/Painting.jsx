import React from "react";
import paintingData from "./data/paintingData";
import siteContent from "../content/siteContent";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { cld, cldSrcSet } from "../utils/cloudinary";

const Painting = () => {
  const { label, heading, lead } = siteContent.painting;

  return (
    <section id="art" className="section-y relative">
      <div className="wrap">
        <SectionTitle index={6} label={label} heading={heading} />
        <Reveal>
          <p className="-mt-6 mb-14 max-w-md text-fg/55">{lead}</p>
        </Reveal>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {paintingData.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className={i % 2 === 1 ? "lg:mt-16" : ""}>
              <figure className="group">
                <div className="overflow-hidden rounded-2xl bg-surface">
                  <img
                    src={cld(p.image, 800)}
                    srcSet={cldSrcSet(p.image, [480, 800, 1200])}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <figcaption className="mt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-fg/40">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-serif text-xl italic leading-tight">{p.title}</h3>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-fg/50">{p.description.trim()}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Painting;
