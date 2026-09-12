"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Line-art glyphs that draw themselves when scrolled into view. */

export type DrawIconName =
  // vertical marks
  | "community"
  | "leaf"
  | "store"
  | "land"
  | "compass"
  // offerings
  | "heart"
  | "users"
  | "sparkle"
  | "factory"
  | "boxes"
  | "basket"
  | "globe"
  | "map"
  | "survey"
  | "megaphone"
  | "briefcase"
  | "plane"
  | "route"
  | "calendar"
  | "shield"
  | "handshake"
  | "book"
  | "recycle"
  | "bottle"
  | "grain"
  | "mortar"
  | "home"
  | "gift"
  | "document"
  | "bed";

const glyphs: Record<DrawIconName, ReactNode> = {
  community: (
    <>
      <circle cx="12" cy="7" r="2.6" />
      <circle cx="5.5" cy="10.5" r="2.1" />
      <circle cx="18.5" cy="10.5" r="2.1" />
      <path d="M8.2 20c0-2.6 1.7-4.5 3.8-4.5s3.8 1.9 3.8 4.5" />
      <path d="M2.5 18.5c0-2 1.3-3.5 3-3.5M21.5 18.5c0-2-1.3-3.5-3-3.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4.5c0 8-4.9 12.5-10.5 12.5H5.5C5.5 9.5 11.5 4.5 20 4.5Z" />
      <path d="M4 20.5c1.8-4.6 5-8 9.5-10" />
    </>
  ),
  store: (
    <>
      <path d="M4 9.5 5.5 4.5h13L20 9.5" />
      <path d="M4 9.5c0 1.4 1.1 2.5 2.5 2.5S9 10.9 9 9.5c0 1.4 1.3 2.5 3 2.5s3-1.1 3-2.5c0 1.4 1.1 2.5 2.5 2.5S20 10.9 20 9.5" />
      <path d="M5.5 12v8h13v-8" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  land: (
    <>
      <path d="M3.5 18.5 9 6l4.5 8 2-3 5 7.5z" />
      <path d="M3.5 18.5h17" />
      <path d="M12.5 8.5 14 6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
      <path d="M12 3.5v1.5M12 19v1.5M3.5 12H5M19 12h1.5" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.4 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M15.5 5.5a3 3 0 0 1 0 5.5M17 14.2c2 .6 3.5 2.4 3.5 4.8" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" />
      <path d="M5 4.5v2M4 5.5h2M19 17.5v2M18 18.5h2" />
    </>
  ),
  factory: (
    <>
      <path d="M3.5 20V9l5 3V9l5 3V9l5 3v8z" />
      <path d="M17 4.5h2.5V12" />
      <path d="M7 16h2M11 16h2M15 16h2" />
    </>
  ),
  boxes: (
    <>
      <path d="M3.5 13.5h7v7h-7zM13.5 13.5h7v7h-7zM8.5 3.5h7v7h-7z" />
      <path d="M7 13.5v2M17 13.5v2M12 3.5v2" />
    </>
  ),
  basket: (
    <>
      <path d="M3.5 10h17l-1.6 9.5H5.1z" />
      <path d="m7.5 10 3-6M16.5 10l-3-6" />
      <path d="M9 13.5v3M12 13.5v3M15 13.5v3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.6 3.7 5.4 3.7 8.5s-1.1 5.9-3.7 8.5c-2.6-2.6-3.7-5.4-3.7-8.5S9.4 6.1 12 3.5Z" />
    </>
  ),
  map: (
    <>
      <path d="m3.5 6.5 5.5-2 6 2 5.5-2v13l-5.5 2-6-2-5.5 2z" />
      <path d="M9 4.5v13M15 6.5v13" />
    </>
  ),
  survey: (
    <>
      <path d="M12 3.5v6M12 12.5v8" />
      <circle cx="12" cy="11" r="1.5" />
      <path d="M6.5 20.5 12 11l5.5 9.5" />
      <path d="M4 7.5h4M16 7.5h4" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4.5 10.5v3l9 3.5V7z" />
      <path d="M13.5 7c2 1.2 3 2.6 3 5s-1 3.8-3 5" />
      <path d="M6.5 14l1 5.5h2.5" />
      <path d="M19 9.5c.7.7 1 1.5 1 2.5s-.3 1.8-1 2.5" />
    </>
  ),
  briefcase: (
    <>
      <path d="M3.5 8h17v11.5h-17z" />
      <path d="M9 8V5.5h6V8M3.5 13h17" />
    </>
  ),
  plane: (
    <>
      <path d="M3.5 13.5 20.5 5l-5 15-3-6.5z" />
      <path d="m12.5 13.5 8-8.5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M6 8.5v3a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3" />
    </>
  ),
  calendar: (
    <>
      <path d="M3.5 6.5h17v14h-17z" />
      <path d="M3.5 10.5h17M8 3.5v4M16 3.5v4" />
      <path d="M7.5 14h2M11 14h2M14.5 14h2M7.5 17h2M11 17h2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 4.5 6.5v5c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9v-5z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  handshake: (
    <>
      <path d="m2.5 10.5 4-4 5 1.5 3-1.5 4 4" />
      <path d="M9 13.5l3 2.5 2-1.5 2 1.5 2.5-2M2.5 10.5l4 4.5M21.5 10.5l-4 4.5" />
      <path d="M11 9.5 8 12.5" />
    </>
  ),
  book: (
    <>
      <path d="M12 7.5C10.5 6 8.5 5.5 4 5.5v12c4.5 0 6.5.5 8 2 1.5-1.5 3.5-2 8-2v-12c-4.5 0-6.5.5-8 2Z" />
      <path d="M12 7.5v12" />
    </>
  ),
  recycle: (
    <>
      <path d="M12 3.5c4 3.5 6 6.5 6 9.5a6 6 0 0 1-12 0c0-3 2-6 6-9.5Z" />
      <path d="M12 20.5v-8M12 15.5 9.5 13M12 13.5 14.5 11" />
    </>
  ),
  bottle: (
    <>
      <path d="M9.75 3.5h4.5v3L16 9v11.5H8V9l1.75-2.5z" />
      <path d="M8 13h8" />
    </>
  ),
  grain: (
    <>
      <path d="M12 20.5V9" />
      <path d="M12 9c0-3 1.5-5.5 4-6 .3 3-1 5.5-4 6ZM12 9c0-3-1.5-5.5-4-6-.3 3 1 5.5 4 6Z" />
      <path d="M12 15.5c0-2.5 1.3-4.5 3.5-5 .3 2.6-.9 4.5-3.5 5ZM12 15.5c0-2.5-1.3-4.5-3.5-5-.3 2.6.9 4.5 3.5 5Z" />
    </>
  ),
  mortar: (
    <>
      <path d="M4.5 10.5h15c0 4.7-3.2 8.5-7.5 8.5S4.5 15.2 4.5 10.5Z" />
      <path d="M9 19v1.5h6V19" />
      <path d="m13.8 10.2 4.7-6.2a1.4 1.4 0 0 1 2.2 1.7L16.4 11" />
    </>
  ),
  home: (
    <>
      <path d="M3.5 10.5 12 4l8.5 6.5" />
      <path d="M5.5 12v8h13v-8" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  gift: (
    <>
      <path d="M3.5 8.5h17V12h-17zM5 12v8h14v-8" />
      <path d="M12 8.5v11.5" />
      <path d="M12 8.5S10.5 4 8 4a2.2 2.2 0 0 0 0 4.5zM12 8.5S13.5 4 16 4a2.2 2.2 0 0 1 0 4.5z" />
    </>
  ),
  document: (
    <>
      <path d="M6.5 3.5h7L18 8v12.5H6.5z" />
      <path d="M13.5 3.5V8H18" />
      <path d="M9.25 12.5h5.5M9.25 16h3.5" />
    </>
  ),
  bed: (
    <>
      <path d="M3.5 19.5v-12" />
      <path d="M3.5 13h13a4 4 0 0 1 4 4v2.5" />
      <path d="M3.5 19.5h17" />
      <path d="M7.5 13v-2.5h4.5V13" />
    </>
  ),
};

export function DrawIcon({
  name,
  className,
  delay = 0,
}: {
  name: DrawIconName;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, visible: {} }}
    >
      <motion.g
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration: 1.25, delay, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.25, delay },
            },
          },
        }}
      >
        {glyphs[name]}
      </motion.g>
    </motion.svg>
  );
}
