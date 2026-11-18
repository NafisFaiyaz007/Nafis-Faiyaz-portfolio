import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Letters rise into place one by one, and roll to a copy of themselves on hover.
 * `inView` waits until the text scrolls into view instead of animating on load.
 */
const SplitText = ({ text, delay = 0, stagger = 0.035, inView = false, className = "" }) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  // observe the wrapper: the letters themselves start clipped, so they never "intersect"
  const seen = useInView(ref, { once: true, amount: 0.5 });
  let n = 0;

  const anim = reduce
    ? {}
    : { initial: { y: "115%" }, animate: { y: !inView || seen ? 0 : "115%" } };

  return (
    <span ref={ref} className={`roll-group ${className}`}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, w, words) => (
        <span key={w} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((ch) => {
            const i = n++;
            return (
              <span key={i} className="roll-clip">
                <motion.span
                  className="inline-block"
                  {...anim}
                  transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
                >
                  <span className="roll-inner" style={{ transitionDelay: `${i * 22}ms` }}>
                    {ch}
                    <span className="roll-copy">{ch}</span>
                  </span>
                </motion.span>
              </span>
            );
          })}
          {w < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
