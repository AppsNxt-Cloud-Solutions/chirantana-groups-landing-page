import type { ReactNode } from "react";
import { Prose } from "@/components/ui/prose";
import { Container, Eyebrow, Section } from "@/components/ui/section";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative bg-obsidian-900 text-ivory-50">
        <Container className="pt-32 pb-14 md:pt-40 md:pb-20">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h1 className="mt-8 text-5xl text-ivory-50">{title}</h1>
          <p className="mt-4 text-sm text-obsidian-300">Last updated {updated}</p>
        </Container>
      </section>
      <Section tone="light">
        <Container>
          <Prose>{children}</Prose>
        </Container>
      </Section>
    </>
  );
}
