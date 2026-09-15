import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { TextMask } from "@/components/motion/text-mask";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { VerticalCard } from "@/components/verticals/vertical-card";
import { CtaBand } from "@/components/sections/cta-band";
import { verticals } from "@/content/verticals";

export const metadata: Metadata = {
  title: "Our five verticals",
  description:
    "Chirantana Foundation, Chirantana Naturals, Chirantana Swadeshi Bhandara, SV Lots India Pvt. Ltd. and Karoli Konnect — each serving a different need, all sharing one foundation.",
  alternates: { canonical: "/verticals" },
};

export default function VerticalsPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-obsidian-900 text-ivory-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_8%,var(--color-peacock-700),transparent_62%)] opacity-60"
        />
        <Container className="relative pt-32 pb-16 md:pt-40 md:pb-24">
          <Reveal direction="none">
            <Eyebrow onDark>Chirantana Group</Eyebrow>
          </Reveal>
          <TextMask
            text="Five verticals. One connected purpose."
            mask={false}
            accentWords={[3, 4]}
            accentClass="text-peacock-300"
            className="display-soft mt-8 max-w-4xl text-6xl text-ivory-50"
          />
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-2xl text-lg text-obsidian-200">
              Each vertical serves a different need while sharing the same foundation of
              trust, quality, service and long-term value creation.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section tone="light">
        <Container>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.map((v, i) => (
              <StaggerItem key={v.slug} className="h-full">
                <VerticalCard vertical={v} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
