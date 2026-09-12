import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/section";
import { values } from "@/content/group";

export function Values() {
  return (
    <section className="overflow-hidden bg-obsidian-950 py-20 text-ivory-50 md:py-28">
      <Reveal className="container-page">
        <Eyebrow onDark>Our values</Eyebrow>
      </Reveal>

      <div className="mt-12 space-y-4">
        <Marquee trackClassName="[animation-duration:52s]">
          {values.map((value) => (
            <ValueWord key={value} large>
              {value}
            </ValueWord>
          ))}
        </Marquee>
        <Marquee reverse trackClassName="[animation-duration:64s]">
          {[...values].reverse().map((value) => (
            <ValueWord key={value}>{value}</ValueWord>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function ValueWord({ children, large }: { children: string; large?: boolean }) {
  return (
    <span className="flex items-center">
      <span
        className={
          large
            ? "display-soft px-8 font-display text-6xl text-ivory-50 md:px-12"
            : "px-8 font-display text-4xl text-obsidian-400 italic md:px-12"
        }
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className={
          large
            ? "size-2.5 rounded-full bg-brass-400"
            : "size-1.5 rounded-full bg-brass-500/60"
        }
      />
    </span>
  );
}
