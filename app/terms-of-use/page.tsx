import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing the use of the ${site.name} website.`,
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Use" updated="September 2026">
      <p>
        By using this website you agree to these terms. The site is operated by{" "}
        {site.legalName}, {site.address.city}, {site.address.region}.
      </p>
      <h2>Information on this site</h2>
      <p>
        Content describes the group and its five verticals in general terms. It is
        provided for information and does not constitute an offer, a professional opinion
        or advice. Product, service and pricing details should be confirmed directly with
        the relevant vertical before any decision is made.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The names, marks, text and design on this site belong to {site.legalName} or its
        verticals and may not be reproduced without permission.
      </p>
      <h2>External links</h2>
      <p>
        Links to third-party services and websites are provided for convenience. We do not
        control and are not responsible for their content.
      </p>
      <h2>Changes</h2>
      <p>
        These terms may be updated from time to time; the date above reflects the latest
        version.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
