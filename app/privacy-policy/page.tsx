import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles information on this website.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="September 2026">
      <p>
        This website is published by {site.legalName}, {site.address.city},{" "}
        {site.address.region}. This policy explains what information the site handles and
        how.
      </p>
      <h2>What this site collects</h2>
      <p>
        This site has no forms, accounts or comment features and does not ask you to
        submit personal information. When you contact us through the WhatsApp, phone or
        email links, that conversation takes place on the respective service and is
        governed by its terms.
      </p>
      <h2>Analytics</h2>
      <p>
        We use Vercel Analytics and Vercel Speed Insights to understand how the site
        performs. These collect aggregated, anonymised usage and performance data and do
        not use cookies or track you across other websites.
      </p>
      <h2>Fonts and third-party requests</h2>
      <p>
        Fonts are self-hosted with the site; no request is made to a third-party font
        service when you visit.
      </p>
      <h2>Links to other services</h2>
      <p>
        Links to WhatsApp, Google Maps and the websites of individual verticals take you
        to services with their own privacy policies.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
