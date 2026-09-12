import { Mail, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { closing } from "@/content/group";
import { type Vertical, verticalContact } from "@/content/verticals";
import { site, whatsappLink } from "@/lib/site";

/**
 * Closing band. On a vertical page pass that vertical so the CTAs reach the
 * team that actually handles the enquiry, not the group switchboard.
 */
export function CtaBand({ vertical }: { vertical?: Vertical } = {}) {
  const contact = vertical
    ? verticalContact(vertical)
    : {
        phone: site.phone,
        whatsapp: site.whatsapp,
        email: site.email,
        ownContact: false,
      };

  return (
    <Section tone="light" size="lg" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(60%_80%_at_50%_100%,var(--color-brass-200),transparent_70%)] opacity-70"
      />
      <Container className="relative">
        <Reveal>
          <Eyebrow>{closing.eyebrow}</Eyebrow>
          <p className="mt-6 max-w-2xl text-lg text-obsidian-600">{closing.lead}</p>
        </Reveal>

        <Stagger gap={0.12} className="mt-10 space-y-1">
          {closing.lines.map((line, i) => (
            <StaggerItem key={line}>
              <p
                className={
                  i === closing.lines.length - 1
                    ? "display-soft font-display text-6xl text-brass-600"
                    : "display-soft font-display text-6xl text-obsidian-900"
                }
              >
                {line}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.3} className="mt-14 flex flex-wrap items-center gap-4">
          <ButtonLink
            href={whatsappLink(contact.whatsapp, vertical?.whatsappMessage)}
            external
            size="lg"
            variant="primary"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            WhatsApp us
          </ButtonLink>
          <ButtonLink
            href={`tel:${contact.phone.e164}`}
            external
            size="lg"
            variant="outline"
          >
            <Phone aria-hidden="true" className="size-4" />
            {contact.phone.display}
          </ButtonLink>
          <ButtonLink href={`mailto:${contact.email}`} external size="lg" variant="ghost">
            <Mail aria-hidden="true" className="size-4" />
            {contact.email}
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
