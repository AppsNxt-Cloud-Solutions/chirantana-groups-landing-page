import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { TextMask } from "@/components/motion/text-mask";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { VerticalCard } from "@/components/verticals/vertical-card";
import { verticals } from "@/content/verticals";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-obsidian-900 text-ivory-50">
        <Container className="relative pt-32 pb-16 md:pt-40 md:pb-24">
          <Reveal direction="none">
            <Eyebrow onDark>Error 404</Eyebrow>
          </Reveal>
          <TextMask
            text="We couldn't find that page."
            mask={false}
            className="display-soft mt-8 max-w-3xl text-6xl text-ivory-50"
          />
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
            <ButtonLink
              href="/"
              size="lg"
              className="bg-ivory-50 text-obsidian-900 hover:bg-peacock-300"
            >
              Back to home
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="onDark">
              Contact us
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
      <Section tone="light" size="sm">
        <Container>
          <h2 className="text-2xl">Or explore a vertical</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.map((v, i) => (
              <VerticalCard key={v.slug} vertical={v} index={i} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
