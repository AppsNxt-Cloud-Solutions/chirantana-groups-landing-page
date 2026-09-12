"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** 1px page-progress rail under the header, tinted by the active accent. */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-60 h-px origin-left bg-accent-400"
      style={{ scaleX }}
    />
  );
}
