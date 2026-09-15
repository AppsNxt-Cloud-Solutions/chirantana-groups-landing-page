import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/section";
import { mission, vision } from "@/content/group";

/** Vision on obsidian, mission on ivory — one split panel. */
export function VisionMission() {
  return (
    <section id="vision" className="grid lg:grid-cols-2">
      <div className="grain relative bg-obsidian-900 px-5 py-20 text-obsidian-200 md:px-12 md:py-28 lg:px-16 lg:py-36">
        <Reveal className="relative mx-auto max-w-xl lg:ml-auto lg:mr-0">
          <Eyebrow onDark>{vision.eyebrow}</Eyebrow>
          <span
            aria-hidden="true"
            className="mt-8 block font-display text-8xl leading-none text-peacock-400/40"
          >
            “
          </span>
          <h2 className="-mt-6 text-4xl text-ivory-50">{vision.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-obsidian-300">{vision.body}</p>
        </Reveal>
      </div>
      <div className="relative bg-surface-alt px-5 py-20 md:px-12 md:py-28 lg:px-16 lg:py-36">
        <Reveal delay={0.15} className="relative mx-auto max-w-xl lg:mr-auto lg:ml-0">
          <Eyebrow>{mission.eyebrow}</Eyebrow>
          <span
            aria-hidden="true"
            className="mt-8 block font-display text-8xl leading-none text-peacock-500/40"
          >
            “
          </span>
          <h2 className="-mt-6 text-4xl text-obsidian-900">{mission.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-obsidian-600">{mission.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
