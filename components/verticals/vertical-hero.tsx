import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { ShaderField } from "@/components/motion/shader-field";
import { TextMask } from "@/components/motion/text-mask";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";
import type { Vertical } from "@/content/verticals";
import { verticalContact, verticals } from "@/content/verticals";
import { whatsappLink } from "@/lib/site";

export function VerticalHero({ vertical }: { vertical: Vertical }) {
  const index = verticals.findIndex((v) => v.slug === vertical.slug);
  const contact = verticalContact(vertical);

  return (
    <section className="grain relative overflow-hidden bg-obsidian-900 text-ivory-50">
      <ShaderField preset="veil" accent={vertical.accent} intensity={0.9} />

      <div className="container-page relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <Reveal direction="none">
          <nav aria-label="Breadcrumb" className="text-xs text-obsidian-300">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-ivory-50">
                  Chirantana Group
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/verticals" className="transition-colors hover:text-ivory-50">
                  Verticals
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ivory-50">
                {vertical.shortName}
              </li>
            </ol>
          </nav>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal direction="none" delay={0.1}>
              <Eyebrow onDark>
                0{index + 1} · {vertical.sector}
              </Eyebrow>
            </Reveal>
            <TextMask
              text={vertical.name}
              as="h1"
              mask={false}
              className="display-soft mt-8 max-w-4xl text-6xl text-ivory-50"
            />
            <Reveal delay={0.35}>
              <p className="mt-4 font-display text-2xl text-accent-300 italic">
                {vertical.tagline}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-obsidian-200">
                {vertical.summary}
              </p>
            </Reveal>
            <Reveal delay={0.5} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <ButtonLink
                  href={whatsappLink(contact.whatsapp, vertical.whatsappMessage)}
                  external
                  size="lg"
                  className="bg-ivory-50 text-obsidian-900 hover:bg-accent-300"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  Enquire on WhatsApp
                </ButtonLink>
              </Magnetic>
              {contact.ownContact && (
                <ButtonLink
                  href={`tel:${contact.phone.e164}`}
                  external
                  size="lg"
                  variant="onDark"
                >
                  <Phone aria-hidden="true" className="size-4" />
                  {contact.phone.display}
                </ButtonLink>
              )}
              {vertical.externalUrl && (
                <ButtonLink
                  href={vertical.externalUrl}
                  external
                  size="lg"
                  variant="onDark"
                >
                  Visit website
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </ButtonLink>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
