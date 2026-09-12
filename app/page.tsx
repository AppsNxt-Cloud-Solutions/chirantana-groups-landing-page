import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { GroupStory } from "@/components/sections/group-story";
import { Hero } from "@/components/sections/hero";
import { Values } from "@/components/sections/values";
import { VisionMission } from "@/components/sections/vision-mission";
import { VerticalsShowcase } from "@/components/verticals/verticals-showcase";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { description: site.description },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <GroupStory />
      <VerticalsShowcase />
      <VisionMission />
      <Values />
      <CtaBand />
    </>
  );
}
