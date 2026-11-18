import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/* ---------- tiny 3D value noise (no dependencies) ---------- */
const hash = (x, y, z) => {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};
const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

const noise3 = (x, y, z) => {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = smooth(x - xi), yf = smooth(y - yi), zf = smooth(z - zi);
  const c = (dx, dy, dz) => hash(xi + dx, yi + dy, zi + dz);
  const x00 = lerp(c(0, 0, 0), c(1, 0, 0), xf);
  const x10 = lerp(c(0, 1, 0), c(1, 1, 0), xf);
  const x01 = lerp(c(0, 0, 1), c(1, 0, 1), xf);
  const x11 = lerp(c(0, 1, 1), c(1, 1, 1), xf);
  return lerp(lerp(x00, x10, yf), lerp(x01, x11, yf), zf);
};
const field = (x, y, z) => noise3(x, y, z) * 0.68 + noise3(x * 2.1, y * 2.1, z * 1.3) * 0.32;

const LEVELS = 11;

/**
 * Topographic contour lines (marching squares over drifting noise).
 * A nod to the geospatial / agri work — the land, drawn as data.
 */
export const Topography = ({ still = false, fixed = true, strength = 1 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, cols = 0, rows = 0, values = null, step = 16;
    let raf = 0, last = 0, z = Math.random() * 100;
    let running = false, visible = true;
    let fg = "236,234,228", accent = "255,90,42";

    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      fg = css.getPropertyValue("--fg").trim().split(/\s+/).join(",");
      accent = css.getPropertyValue("--accent").trim().split(/\s+/).join(",");
    };

    const resize = () => {
      const small = window.innerWidth < 768;
      // phones: coarser grid + lower pixel density; extra height so the
      // address bar showing/hiding never exposes an unpainted strip
      step = small ? 22 : 16;
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.5);
      w = window.innerWidth;
      h = window.innerHeight + (small ? 160 : 0);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / step) + 1;
      rows = Math.ceil(h / step) + 1;
      values = new Float32Array(cols * rows);
    };

    const draw = () => {
      const scroll = window.scrollY * 0.0005;
      const scale = 0.0042;

      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++)
          values[j * cols + i] = field(i * step * scale, j * step * scale + scroll, z);

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      for (let l = 1; l < LEVELS; l++) {
        const t = l / LEVELS;
        const highlight = l === 6;
        ctx.strokeStyle = highlight
          ? `rgba(${accent},${Math.min(0.32 * strength, 0.6)})`
          : `rgba(${fg},${0.075 * strength})`;
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = values[j * cols + i];
            const b = values[j * cols + i + 1];
            const c = values[(j + 1) * cols + i + 1];
            const d = values[(j + 1) * cols + i];
            const idx = (a > t ? 8 : 0) | (b > t ? 4 : 0) | (c > t ? 2 : 0) | (d > t ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x = i * step, y = j * step;
            const top = [x + step * ((t - a) / (b - a)), y];
            const right = [x + step, y + step * ((t - b) / (c - b))];
            const bottom = [x + step * ((t - d) / (c - d)), y + step];
            const left = [x, y + step * ((t - a) / (d - a))];
            const seg = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
            switch (idx) {
              case 1: case 14: seg(left, bottom); break;
              case 2: case 13: seg(bottom, right); break;
              case 3: case 12: seg(left, right); break;
              case 4: case 11: seg(top, right); break;
              case 5: seg(left, top); seg(bottom, right); break;
              case 6: case 9: seg(top, bottom); break;
              case 7: case 8: seg(left, top); break;
              case 10: seg(left, bottom); seg(top, right); break;
              default: break;
            }
          }
        }
        ctx.stroke();
      }
    };

    const loop = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (now - last < 50) return; // ~20fps is plenty for slow drift
      last = now;
      z += 0.006;
      draw();
    };

    const start = () => {
      if (running || still || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    readColors();
    resize();
    draw();

    let lastW = window.innerWidth, lastH = window.innerHeight, rq = 0;
    const onResize = () => {
      cancelAnimationFrame(rq);
      rq = requestAnimationFrame(() => {
        const nw = window.innerWidth, nh = window.innerHeight;
        // on phones the address bar changes the height constantly; ignore that
        if (nw === lastW && nw < 768 && Math.abs(nh - lastH) < 160) return;
        lastW = nw; lastH = nh;
        resize();
        draw();
      });
    };
    window.addEventListener("resize", onResize);

    // only animate while the canvas is on screen and the tab is visible
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    // repaint when the theme flips, even when motion is off
    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      stop();
      cancelAnimationFrame(rq);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      mo.disconnect();
    };
  }, [still, strength]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`${fixed ? "fixed" : "absolute"} inset-0 pointer-events-none`}
      style={{
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 85%)",
      }}
    />
  );
};

const Background = () => {
  const reduce = useReducedMotion();
  const mx = useMotionValue(typeof window !== "undefined" ? window.innerWidth * 0.7 : 0);
  const my = useMotionValue(typeof window !== "undefined" ? window.innerHeight * 0.3 : 0);
  const x = useSpring(mx, { stiffness: 40, damping: 20, mass: 1 });
  const y = useSpring(my, { stiffness: 40, damping: 20, mass: 1 });

  useEffect(() => {
    if (reduce) return undefined;
    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* slow drifting warm glow */}
      <div
        className="aurora-drift absolute left-[10%] top-[-10%] h-[70vmax] w-[70vmax] rounded-full"
        style={{ background: "radial-gradient(circle, rgb(var(--accent) / 0.10), transparent 62%)" }}
      />
      {/* glow that follows the cursor (mouse/trackpad only) */}
      <motion.div
        className="absolute left-0 top-0 h-[44vmax] w-[44vmax] rounded-full [@media(pointer:coarse)]:hidden"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgb(var(--accent) / 0.13), transparent 60%)",
        }}
      />
      <Topography still={!!reduce} />
      <div className="grain" />
    </div>
  );
};

export default Background;
