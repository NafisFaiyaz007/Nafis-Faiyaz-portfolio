import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import siteContent from "../content/siteContent";

const EASE = [0.22, 1, 0.36, 1];

// HashRouter owns the URL hash, so scroll to sections by hand.
export const scrollToId = (id) => {
  if (id === "top") return window.scrollTo({ top: 0, behavior: "smooth" });
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const ThemeIcon = ({ light }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
    {light ? (
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    ) : (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    )}
  </svg>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(() =>
    document.documentElement.classList.contains("light")
  );
  const { navbar, documents, socials, profile } = siteContent;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    // the overlay is phone/tablet only: close it if the window grows to desktop
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const toggleTheme = () => {
    const next = !light;
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch (e) {
      /* storage unavailable: theme just won't persist */
    }
    setLight(next);
  };

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    // let the overlay start closing before the page scrolls
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  const btn =
    "grid h-10 w-10 place-items-center rounded-full border border-fg/15 bg-ground/60 backdrop-blur-md transition-colors hover:border-accent hover:text-accent";

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-fg/10 bg-ground/90 backdrop-blur-md">
        <nav className="wrap grid h-16 grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
          <a
            href="#top"
            onClick={go("top")}
            className="flex items-center gap-2.5 justify-self-start text-[15px] font-medium tracking-[-0.01em]"
          >
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
            {navbar.tagline}
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-fg/45 sm:inline">Portfolio ’26</span>
          </a>

          {/* desktop: centred section links, as in the template */}
          <ul className="hidden items-center gap-7 lg:flex">
            {navbar.desktop.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href || `#${l.id}`}
                  {...(l.href ? { target: "_blank", rel: "noopener noreferrer" } : { onClick: go(l.id) })}
                  className="group flex items-center gap-2 text-[14px] font-medium transition-colors hover:text-accent"
                >
                  <span className="h-px w-2.5 bg-fg/50 transition-all duration-300 group-hover:w-4 group-hover:bg-accent" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 justify-self-end">
            <span className="hidden items-center gap-2 rounded-full border border-fg/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] xl:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {navbar.statusPill}
            </span>
            <button onClick={toggleTheme} aria-label={light ? "Switch to dark theme" : "Switch to light theme"} className={btn}>
              <ThemeIcon light={light} />
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`${btn} lg:hidden`}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-all duration-500 ease-out ${
                    open ? "top-1.5 rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-all duration-500 ease-out ${
                    open ? "top-1.5 -rotate-45" : "top-2.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ground/95 px-4 pb-8 pt-24 backdrop-blur-xl sm:px-6"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul className="flex-1 overflow-y-auto">
              {navbar.links.map((l, i) => (
                <li key={l.id} className="overflow-hidden border-b border-fg/10">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    className="group flex items-baseline gap-5 py-2.5 sm:py-3"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.04 }}
                  >
                    <span className="w-6 font-mono text-[11px] text-fg/40">
                      {String(i).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(2rem,6vw,4rem)] font-medium leading-none tracking-[-0.03em] transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-accent">
                      {l.label}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              className="mt-8 flex flex-wrap items-end justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-fg/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-wrap gap-3">
                <a href={documents.resume} target="_blank" rel="noopener noreferrer" className="rounded-full bg-fg px-4 py-2.5 text-ground hover:bg-accent">
                  Résumé (PDF) ↗
                </a>
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-fg/20 px-4 py-2.5 hover:border-accent hover:text-accent">
                  LinkedIn ↗
                </a>
              </div>
              <div className="flex flex-wrap gap-5">
                <a href={`mailto:${profile.email}`} className="normal-case tracking-normal hover:text-accent">{profile.email}</a>
                <span>{navbar.status}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
