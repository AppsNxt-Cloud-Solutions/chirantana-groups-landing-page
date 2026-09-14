import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { ShaderField } from "@/components/motion/shader-field";
import { TextMask } from "@/components/motion/text-mask";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";
import { hero } from "@/content/group";
import { verticals } from "@/content/verticals";

export function Hero() {
  return (
    <section className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-obsidian-900 text-ivory-50">
      <ShaderField preset="aurora" accent="peacock" />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pt-32 pb-16 md:pt-40">
        <Reveal direction="none" duration={0.9}>
          <Eyebrow onDark>{hero.eyebrow}</Eyebrow>
        </Reveal>

        {/* mask={false}: a clipped, transparent headline isn't "painted" for
            LCP purposes. Above the fold the words drift, they don't rise. */}
        <TextMask
          text={hero.title}
          as="h1"
          mask={false}
          accentWords={hero.accentWords}
          accentClass="text-peacock-300"
          className="display-soft mt-8 max-w-5xl text-7xl text-ivory-50"
        />

        <Reveal delay={0.45} className="mt-8 max-w-xl">
          <p className="text-lg leading-relaxed text-obsidian-200 md:text-xl">
            {hero.intro}
          </p>
        </Reveal>

        <Reveal delay={0.6} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <ButtonLink
              href="/verticals"
              size="lg"
              className="bg-ivory-50 text-obsidian-900 hover:bg-peacock-300"
            >
              Explore the five verticals
            </ButtonLink>
          </Magnetic>
          <ButtonLink href="/contact" size="lg" variant="onDark">
            Get in touch
          </ButtonLink>
        </Reveal>
      </div>

      {/* Chapter index — the five verticals as a strip along the bottom edge. */}
      <Reveal
        delay={0.8}
        direction="none"
        className="container-page relative z-10 border-t border-ivory-50/10 py-5"
      >
        <div className="flex items-center justify-between gap-6">
          <ol className="flex flex-wrap gap-x-6 gap-y-2">
            {verticals.map((v, i) => (
              <li key={v.slug} data-accent={v.accent}>
                <Link
                  href={`/verticals/${v.slug}`}
                  className="group inline-flex items-center gap-2 text-xs font-medium tracking-wide text-obsidian-300 uppercase transition-colors hover:text-ivory-50"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-accent-400 transition-transform duration-300 group-hover:scale-150"
                  />
                  <span className="font-display text-obsidian-300 tabular-nums normal-case">
                    0{i + 1}
                  </span>
                  {v.shortName}
                </Link>
              </li>
            ))}
          </ol>
          <a
            href="#story"
            className="hidden shrink-0 items-center gap-2 text-xs tracking-wide text-obsidian-400 uppercase transition-colors hover:text-ivory-50 md:inline-flex"
          >
            Scroll
            <ArrowDown aria-hidden="true" className="size-3.5 animate-bounce" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
