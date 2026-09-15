import type { Metadata } from "next";
import { ContactChannels } from "@/components/contact/contact-channels";
import { OfficeMap } from "@/components/contact/office-map";
import { VerticalContactList } from "@/components/contact/vertical-contact-list";
import { Reveal } from "@/components/motion/reveal";
import { TextMask } from "@/components/motion/text-mask";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach Chirantana Group in ${site.address.city}, ${site.address.region} — by WhatsApp, phone or email, or enquire about a specific vertical.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-obsidian-900 text-ivory-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_8%,var(--color-peacock-700),transparent_62%)] opacity-60"
        />
        <Container className="relative pt-32 pb-16 md:pt-40 md:pb-24">
          <Reveal direction="none">
            <Eyebrow onDark>Contact</Eyebrow>
          </Reveal>
          <TextMask
            text="Let's talk."
            mask={false}
            className="display-soft mt-8 text-7xl text-ivory-50"
          />
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-lg text-obsidian-200">
              One office in {site.address.city}, five businesses. Choose the channel that
              suits you — or go straight to the vertical you have in mind.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section tone="light">
        <Container>
          <ContactChannels />
        </Container>
      </Section>

      <OfficeMap />

      <Section tone="void">
        <Container>
          <SectionHeading
            onDark
            eyebrow="By vertical"
            title="Enquire about a specific business"
            intro="Each link opens WhatsApp with a message already addressed to that vertical."
          />
          <div className="mt-12">
            <VerticalContactList />
          </div>
        </Container>
      </Section>
    </>
  );
}
