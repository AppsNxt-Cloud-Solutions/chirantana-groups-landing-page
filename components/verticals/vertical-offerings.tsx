import { DrawIcon } from "@/components/motion/draw-icon";
import { Reveal } from "@/components/motion/reveal";
import type { VerticalOffering } from "@/content/verticals";

/**
 * The offerings taxonomy as an editorial index rather than a card grid: each
 * row pairs a heading with the specific things under it. Scales from four
 * groups to seven, and from two items to twelve, without going lopsided.
 */
export function VerticalOfferings({ offerings }: { offerings: VerticalOffering[] }) {
  return (
    <ol className="border-y border-obsidian-200">
      {offerings.map((offering, i) => (
        <li
          key={offering.title}
          className="border-t border-obsidian-200 first:border-t-0"
        >
          <Reveal
            delay={Math.min(i, 4) * 0.05}
            className="grid gap-6 py-9 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-14 md:py-11"
          >
            <div className="flex gap-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-700">
                <DrawIcon name={offering.icon} className="size-5" delay={0.1} />
              </span>
              <div>
                <span
                  aria-hidden="true"
                  className="font-display text-sm text-obsidian-500 tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-0.5 text-2xl">{offering.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-obsidian-500">
                  {offering.description}
                </p>
              </div>
            </div>

            <ul className="flex flex-wrap content-start gap-2 md:pt-1.5">
              {offering.items.map((item) => (
                <li
                  key={item}
                  className="rounded-pill border border-obsidian-200 bg-surface px-3.5 py-1.5 text-sm text-obsidian-600 transition-colors duration-300 hover:border-accent-400 hover:text-accent-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
