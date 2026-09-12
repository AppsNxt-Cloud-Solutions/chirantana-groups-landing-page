import { ArrowUpRight } from "lucide-react";
import { DrawIcon } from "@/components/motion/draw-icon";
import { CardLink } from "@/components/ui/card";
import type { Vertical } from "@/content/verticals";

/** Compact card form of a vertical — /verticals index and cross-links. */
export function VerticalCard({
  vertical,
  index,
  tone = "light",
}: {
  vertical: Vertical;
  index?: number;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div data-accent={vertical.accent} className="h-full">
      <CardLink
        href={`/verticals/${vertical.slug}`}
        tone={tone}
        ariaLabel={`Explore ${vertical.name}`}
        className="flex h-full flex-col p-7 md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <DrawIcon
            name={vertical.icon}
            className={dark ? "size-11 text-accent-300" : "size-11 text-accent-600"}
          />
          {index !== undefined && (
            <span
              aria-hidden="true"
              className={
                dark
                  ? "font-display text-2xl text-obsidian-300 tabular-nums"
                  : "font-display text-2xl text-obsidian-500 tabular-nums"
              }
            >
              0{index + 1}
            </span>
          )}
        </div>
        <p
          className={
            dark
              ? "mt-8 text-xs font-medium tracking-widest text-accent-300 uppercase"
              : "mt-8 text-xs font-medium tracking-widest text-accent-700 uppercase"
          }
        >
          {vertical.sector}
        </p>
        <h3 className={dark ? "mt-2 text-2xl text-ivory-50" : "mt-2 text-2xl"}>
          {vertical.name}
        </h3>
        <p
          className={
            dark
              ? "mt-3 flex-1 text-sm leading-relaxed text-obsidian-300"
              : "mt-3 flex-1 text-sm leading-relaxed text-obsidian-500"
          }
        >
          {vertical.coreBusiness}
        </p>
        <span
          className={
            dark
              ? "mt-6 inline-flex items-center gap-2 text-sm font-medium text-ivory-50 transition-colors group-hover:text-accent-300"
              : "mt-6 inline-flex items-center gap-2 text-sm font-medium text-obsidian-900 transition-colors group-hover:text-accent-700"
          }
        >
          Explore
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </CardLink>
    </div>
  );
}
