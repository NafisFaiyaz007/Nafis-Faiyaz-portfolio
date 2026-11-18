import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import siteContent from "../content/siteContent";
import Reveal from "./Reveal";

const STEP = 26; // degrees between items on the drum
const VISIBLE = 3; // items rendered either side of the front

// Type size for the wheel: as large as the template's (~6vw on desktop) but never
// so large that the longest label overflows. The drum radius follows it.
const wheelFont = (vw, longest) => {
  const column = vw >= 1024 ? vw * 0.6 : vw - 48; // wheel column width (gutters, number)
  const fit = (column - 40) / (longest * 0.54); // ~0.54em per Geist character
  return Math.max(24, Math.min(fit, vw >= 1024 ? Math.min(vw * 0.061, 104) : 64));
};

/**
 * A vertical drum of disciplines. Scrolling the page turns it; dragging with a
 * mouse adds an offset that springs into the nearest notch. Arrow keys work too.
 * On touch screens the page scroll drives it, so vertical swipes are never trapped.
 */
const Wheel = ({ items }) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const n = items.length;
  const longest = Math.max(...items.map((t) => t.length));
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const fromScroll = useTransform(scrollYProgress, [0.2, 0.8], [0, n - 1], { clamp: true });
  const drag = useMotionValue(0);
  const [pos, setPos] = useState(0);
  const [fs, setFs] = useState(() => wheelFont(window.innerWidth, longest));

  const update = () => setPos((reduce ? 0 : fromScroll.get()) + drag.get());
  useMotionValueEvent(fromScroll, "change", update);
  useMotionValueEvent(drag, "change", update);

  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setFs(wheelFont(window.innerWidth, longest)));
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [longest]);

  // adjacent items sit ~0.97em apart on the drum surface
  const radius = (fs * 0.97) / (2 * Math.sin(((STEP / 2) * Math.PI) / 180));

  const settle = (to) => animate(drag, to, { type: "spring", stiffness: 220, damping: 26 });
  const dragState = useRef(null);
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    dragState.current = { y: e.clientY, start: drag.get() };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragState.current) return;
    drag.set(dragState.current.start - (e.clientY - dragState.current.y) / (fs * 0.8));
  };
  const onPointerUp = () => {
    if (!dragState.current) return;
    dragState.current = null;
    const total = fromScroll.get() + drag.get();
    settle(drag.get() + (Math.round(total) - total));
  };

  const center = Math.round(pos);
  const frac = pos - center;
  const slots = [];
  for (let k = -VISIBLE; k <= VISIBLE; k++) {
    const idx = (((center + k) % n) + n) % n;
    slots.push({ k, idx, angle: (k - frac) * STEP });
  }

  return (
    <div
      ref={ref}
      className="relative w-full touch-pan-y select-none outline-none focus-visible:ring-1 focus-visible:ring-accent/60 [@media(pointer:fine)]:cursor-grab [@media(pointer:fine)]:active:cursor-grabbing"
      style={{ perspective: `${Math.round(fs * 13)}px`, height: fs * 5.4 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      tabIndex={0}
      onKeyDown={(e) => {
        const d = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        settle(Math.round(drag.get()) + d);
      }}
      role="group"
      aria-label="Disciplines wheel — use the up and down arrow keys to turn"
    >
      <p className="sr-only" aria-live="polite">
        {items[((center % n) + n) % n]}
      </p>
      <ul className="absolute inset-x-0 top-1/2" style={{ transformStyle: "preserve-3d" }}>
        {slots.map(({ k, idx, angle }) => {
          const a = Math.abs(angle);
          const front = a < STEP / 2;
          return (
            <li
              key={k}
              aria-hidden={!front}
              className="absolute left-0 top-0 flex items-baseline gap-[0.35em] whitespace-nowrap"
              style={{
                fontSize: fs,
                // drum axis sits `radius` behind the screen, so the front item is at z = 0
                transform: `translateY(-50%) translateZ(${-radius}px) rotateX(${-angle}deg) translateZ(${radius}px)`,
                // fade out before items turn edge-on at the top and bottom of the drum
                opacity: a >= 80 ? 0 : (1 - Math.pow(a / 80, 2) * 0.85) * Math.min(1, (80 - a) / 16),
                backfaceVisibility: "hidden",
              }}
            >
              <span className="w-[1.6rem] shrink-0 text-right font-mono text-[11px] text-accent">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span
                className={`font-display font-medium leading-none tracking-[-0.05em] transition-colors duration-300 ${
                  front ? "text-fg" : "text-fg/40"
                }`}
              >
                {items[idx]}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Toolkit = () => {
  const { label, heading, lead, areas, tools } = siteContent.toolkit;

  return (
    <section id="toolkit" className="section-y relative overflow-hidden border-t border-fg/10">
      <div className="wrap">
        {/* template layout: copy column left, wheel right, vertically centred */}
        <div className="flex flex-col gap-10 lg:min-h-[35rem] lg:flex-row lg:items-center lg:gap-12">
          <Reveal className="lg:w-[clamp(20rem,30vw,30rem)] lg:shrink-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">( 05 ) — {label}</p>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,4.2vw,4rem)] font-medium leading-none tracking-[-0.045em]">
              {heading[0]} <span className="lg:block">{heading[1]}</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg/55">{lead}</p>
            <p className="mt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em]">{tools.join(" · ")}</p>
          </Reveal>
          <div className="min-w-0 flex-1">
            <Wheel items={areas} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Toolkit;
