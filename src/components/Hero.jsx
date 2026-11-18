import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import siteContent from "../content/siteContent";
import SplitText from "./SplitText";
import { Topography } from "./Background";
import cutout from "../images/nafis-cutout.webp";

const EASE = [0.22, 1, 0.36, 1];
const NAV = 64;
const PAD = 16;
const GAP = 24;

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Height comes from the pinned box itself (100svh), not window.innerHeight,
// so a phone's collapsing address bar can't push the caption out of view.
const readViewport = (box) => {
  const vw = window.innerWidth;
  const vh = box?.clientHeight || window.innerHeight;
  // stacked layout for phones and any portrait screen (e.g. an upright tablet)
  return { vw, vh, mobile: vw < 768 || vh > vw * 1.15 };
};

/**
 * Geometry of the hero at scroll progress t (0 → 1 over the pinned section).
 * The portrait card grows from a small centred card to the full viewport,
 * pushing the two halves of the name out of frame.
 */
const layoutAt = (t, { vw, vh, mobile }) => {
  const e = easeInOut(clamp01(t / 0.5));
  const area = vh - NAV;
  const w0 = mobile ? vw * 0.62 : Math.min(vw * 0.28, 420);
  const h0 = Math.min(w0 * 1.25, area * (mobile ? 0.5 : 0.66));
  const wE = vw - PAD * 2;
  const hE = area - PAD;
  const w = lerp(w0, wE, e);
  const h = lerp(h0, hE, e);
  const cy = lerp(NAV + area / 2, NAV + hE / 2, e);
  const left = vw / 2 - w / 2;
  const top = cy - h / 2;
  return { e, w, h, left, top, right: left + w, bottom: top + h };
};

const Hero = () => {
  const { profile, hero } = siteContent;
  const ref = useRef(null);
  const boxRef = useRef(null);
  const reduce = useReducedMotion();
  const [vp, setVp] = useState(() => readViewport(null));
  const vpRef = useRef(vp);
  const tick = useMotionValue(0); // nudges the transforms after a resize

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const next = readViewport(boxRef.current);
      const prev = vpRef.current;
      if (next.vw === prev.vw && next.vh === prev.vh && next.mobile === prev.mobile) return;
      vpRef.current = next;
      setVp(next);
      tick.set(tick.get() + 1);
    };
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [tick]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // every value below is derived from the same geometry function
  const useGeom = (fn) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform([scrollYProgress, tick], ([t]) => fn(layoutAt(t, vpRef.current), t));

  const frameLeft = useGeom((g) => g.left);
  const frameTop = useGeom((g) => g.top);
  const frameW = useGeom((g) => g.w);
  const frameH = useGeom((g) => g.h);
  const imgScale = useGeom((g) => lerp(1.12, 1, g.e));
  const nameOpacity = useGeom((g) => 1 - clamp01((g.e - 0.55) / 0.3));

  // desktop: names sit either side of the card; mobile: above and below it
  const leftNameRight = useGeom((g) => vpRef.current.vw - (g.left - GAP));
  const rightNameLeft = useGeom((g) => g.right + GAP);
  const nameCenter = useGeom((g) => g.top + g.h / 2);
  const topNameBottom = useGeom((g) => vpRef.current.vh - (g.top - GAP * 0.6));
  const bottomNameTop = useGeom((g) => g.bottom + GAP * 0.6);

  const finalOpacity = useGeom((_, t) => clamp01((t - 0.42) / 0.14));
  const finalY = useGeom((_, t) => lerp(24, 0, clamp01((t - 0.42) / 0.14)));

  const { vw, mobile } = vp;
  const sideSpace = (vw - Math.min(vw * 0.28, 420)) / 2 - GAP - PAD;
  const fontSize = mobile ? Math.min(vw * 0.2, 150) : Math.min(vw * 0.11, sideSpace / 3.35, 200);
  const nameCls = "absolute z-20 whitespace-nowrap font-display font-medium leading-[0.85] tracking-[-0.045em]";

  return (
    <section ref={ref} id="top" className="relative h-[190vh]" aria-label="Introduction">
      <div ref={boxRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <h1 className="sr-only">
          {profile.name} — {hero.role}
        </h1>

        {/* first name */}
        <motion.div
          aria-hidden="true"
          className={nameCls}
          style={
            mobile
              ? { left: PAD, bottom: topNameBottom, fontSize, opacity: nameOpacity }
              : { right: leftNameRight, top: nameCenter, y: "-50%", fontSize, opacity: nameOpacity }
          }
        >
          <SplitText text={profile.firstName} delay={0.35} />
        </motion.div>

        {/* last name */}
        <motion.div
          aria-hidden="true"
          className={nameCls}
          style={
            mobile
              ? { right: PAD, top: bottomNameTop, fontSize, opacity: nameOpacity }
              : { left: rightNameLeft, top: nameCenter, y: "-50%", fontSize, opacity: nameOpacity }
          }
        >
          <SplitText text={profile.lastName} delay={0.5} />
        </motion.div>

        {/* the portrait card */}
        <motion.div
          className="absolute z-10 overflow-hidden rounded-md"
          style={{ left: frameLeft, top: frameTop, width: frameW, height: frameH }}
          initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.1 }}
        >
          {/* studio backdrop: charcoal falloff, warm rim light, live contour lines */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 75% 65% at 50% 38%, #262522 0%, #151514 55%, #0b0b0a 100%)" }}
          />
          <div className="absolute left-1/2 top-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2 opacity-90">
            <Topography fixed={false} strength={1.6} />
          </div>
          <div
            className="absolute bottom-[-10%] left-1/2 h-[85%] w-[75%] max-w-[46rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(ellipse at 50% 55%, rgb(255 90 42 / 0.42), rgb(255 90 42 / 0.10) 45%, transparent 70%)" }}
          />

          <motion.img
            src={cutout}
            alt={`Portrait of ${profile.name}`}
            fetchpriority="high"
            decoding="async"
            className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none origin-bottom select-none object-contain"
            style={{
              x: "-50%", // set here: Framer's inline transform would override a Tailwind translate
              scale: reduce ? 1 : imgScale,
              filter: "grayscale(1) contrast(1.08) drop-shadow(0 0 1px rgb(255 120 70 / 0.65)) drop-shadow(0 0 22px rgb(255 90 42 / 0.30))",
            }}
            draggable="false"
          />

          {/* bottom fade so the caption stays legible */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0e0e0d]/85 to-transparent" />

          {/* caption that settles in once the card fills the screen */}
          <motion.div
            className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-4 text-[#edece8] sm:p-6"
            style={{ opacity: finalOpacity, y: finalY }}
          >
            <p aria-hidden="true" className="whitespace-nowrap font-display text-[clamp(2.4rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              {profile.name.replace("Chowdhury ", "")}
            </p>
            <p className="hidden whitespace-nowrap pb-2 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#edece8]/70 xl:block">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
              {hero.status}
            </p>
            <p className="max-w-[16rem] pb-2 text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] sm:text-[11px]">
              {hero.role}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
