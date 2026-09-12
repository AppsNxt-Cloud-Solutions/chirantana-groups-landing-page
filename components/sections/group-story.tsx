import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { story } from "@/content/group";
import { verticals } from "@/content/verticals";
import { site } from "@/lib/site";

export function GroupStory() {
  return (
    <Section id="story" tone="light" size="lg">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={story.eyebrow} title={story.title} />
          <Reveal
            delay={0.15}
            className="mt-10 flex gap-10 border-t border-obsidian-200 pt-8"
          >
            <Fact value={String(verticals.length)} label="Verticals" />
            <Fact value="1" label="Shared foundation" />
            <Fact value={site.address.city} label={site.address.region} />
          </Reveal>
        </div>

        <Stagger gap={0.15} className="space-y-8">
          {story.paragraphs.map((paragraph, i) => (
            <StaggerItem key={paragraph.slice(0, 24)}>
              <p
                className={
                  i === 0
                    ? "font-display text-2xl leading-snug text-obsidian-900 first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-brass-600"
                    : "text-lg leading-relaxed text-obsidian-600"
                }
              >
                {paragraph}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl text-obsidian-900">{value}</p>
      <p className="mt-1 text-xs font-medium tracking-widest text-obsidian-500 uppercase">
        {label}
      </p>
    </div>
  );
}
