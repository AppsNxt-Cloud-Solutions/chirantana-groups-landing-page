import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { VerticalCard } from "@/components/verticals/vertical-card";
import { otherVerticals } from "@/content/verticals";

export function VerticalCrossLinks({ slug }: { slug: string }) {
  const others = otherVerticals(slug);
  return (
    <Section tone="void">
      <Container>
        <SectionHeading
          onDark
          eyebrow="The rest of the group"
          title="Four more verticals, one shared foundation"
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((v) => (
            <StaggerItem key={v.slug} className="h-full">
              <VerticalCard vertical={v} tone="dark" />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
