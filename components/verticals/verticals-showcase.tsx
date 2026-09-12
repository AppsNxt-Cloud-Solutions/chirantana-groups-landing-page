"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { DrawIcon } from "@/components/motion/draw-icon";
import { Eyebrow } from "@/components/ui/section";
import { verticals } from "@/content/verticals";
import { cn } from "@/lib/utils";

/**
 * The signature piece: five scroll-linked panels. On desktop a sticky rail
 * tracks the active panel and the whole section rebinds its accent as you
 * scroll, so the hue shifts vertical by vertical. On mobile the panels stack.
 *
 * Every panel carries its full content, so the sticky rail is progressive
 * enhancement — nothing is lost without JS.
 */
export function VerticalsShowcase() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = verticals[active];

  return (
    <section
      id="verticals"
      data-accent={current.accent}
      className="relative bg-obsidian-950 py-20 text-obsidian-200 transition-colors duration-700 md:py-28"
    >
      {/* Ambient accent glow that follows the active vertical. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_30%,var(--v-700),transparent_70%)] opacity-30 transition-[background] duration-1000"
      />

      <div className="container-page relative grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        {/* Sticky rail */}
        <div className="lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-8rem)] lg:flex-col lg:justify-between">
          <div>
            <Eyebrow onDark>Our five verticals</Eyebrow>
            <h2 className="mt-6 text-4xl text-ivory-50 text-balance-tight">
              Each serving a different need. All sharing one foundation.
            </h2>
          </div>

          <div className="mt-10 hidden lg:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.slug}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-end gap-6"
              >
                <span className="font-display text-8xl leading-none text-accent-400/90 tabular-nums">
                  0{active + 1}
                </span>
                <div className="pb-3">
                  <p className="text-xs font-medium tracking-widest text-accent-300 uppercase">
                    {current.sector}
                  </p>
                  <p className="mt-2 font-display text-3xl text-ivory-50">
                    {current.shortName}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <ol className="mt-10 flex gap-2">
              {verticals.map((v, i) => (
                <li key={v.slug} className="flex-1">
                  <a
                    href={`#vertical-${v.slug}`}
                    aria-label={v.shortName}
                    aria-current={i === active ? "true" : undefined}
                    className="block py-2"
                  >
                    <span
                      className={cn(
                        "block h-px transition-all duration-500",
                        i === active
                          ? "bg-accent-400"
                          : "bg-ivory-50/15 hover:bg-ivory-50/40",
                      )}
                    />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Panels */}
        <div className="space-y-6 lg:space-y-10">
          {verticals.map((v, i) => (
            <motion.article
              key={v.slug}
              id={`vertical-${v.slug}`}
              data-accent={v.accent}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.5, margin: "-10% 0px -10% 0px" }}
              className="group relative overflow-hidden rounded-panel border border-ivory-50/10 bg-ivory-50/[0.03] p-8 transition-colors duration-500 hover:border-accent-400/40 md:p-10 lg:min-h-[70vh] lg:p-12"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-accent-500/20 blur-3xl transition-opacity duration-700 group-hover:opacity-100 lg:opacity-60"
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-6">
                  <span className="font-display text-2xl text-obsidian-300 tabular-nums">
                    0{i + 1}
                  </span>
                  <DrawIcon
                    name={v.icon}
                    className="size-12 text-accent-300"
                    delay={0.1}
                  />
                </div>

                <p className="mt-8 text-xs font-medium tracking-widest text-accent-300 uppercase">
                  {v.sector}
                </p>
                <h3 className="mt-3 text-3xl text-ivory-50 md:text-4xl">{v.name}</h3>
                <p className="mt-2 font-display text-xl text-accent-300/90 italic">
                  {v.tagline}
                </p>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-obsidian-300">
                  {v.summary}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {v.offerings.map((o) => (
                    <li
                      key={o.title}
                      className="rounded-pill border border-ivory-50/10 px-3 py-1.5 text-xs text-obsidian-200"
                    >
                      {o.title}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <Link
                    href={`/verticals/${v.slug}`}
                    className="inline-flex items-center gap-3 text-sm font-medium text-ivory-50 transition-colors hover:text-accent-300"
                  >
                    Explore {v.shortName}
                    <span
                      aria-hidden="true"
                      className="h-px w-10 bg-accent-400 transition-all duration-500 group-hover:w-16"
                    />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
