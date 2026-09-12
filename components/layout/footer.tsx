import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { verticals } from "@/content/verticals";
import { footerNav, formattedAddress, site, telHref, whatsappHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="grain bg-obsidian-950 text-obsidian-300">
      <div className="container-page relative grid gap-12 py-16 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
        <div>
          <p className="font-display text-2xl text-ivory-50">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-obsidian-400">
            {site.description}
          </p>
        </div>

        <div>
          <FooterHeading>Verticals</FooterHeading>
          <ul className="mt-5 space-y-3 text-sm">
            {verticals.map((v) => (
              <li key={v.slug} data-accent={v.accent}>
                <Link
                  href={`/verticals/${v.slug}`}
                  className="group inline-flex items-center gap-2.5 text-obsidian-400 transition-colors duration-300 hover:text-ivory-50"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-accent-400 transition-transform duration-300 group-hover:scale-150"
                  />
                  {v.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Group</FooterHeading>
          <ul className="mt-5 space-y-3 text-sm">
            {footerNav.group.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-obsidian-400 transition-colors duration-300 hover:text-ivory-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Office</FooterHeading>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-brass-500"
              />
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="leading-relaxed text-obsidian-400 transition-colors hover:text-ivory-50"
              >
                {formattedAddress}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-brass-500"
              />
              <a
                href={`mailto:${site.email}`}
                className="text-obsidian-400 transition-colors hover:text-ivory-50"
              >
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-brass-500"
              />
              <span className="flex flex-col">
                <a
                  href={telHref}
                  className="inline-flex min-h-11 items-center text-obsidian-400 transition-colors hover:text-ivory-50"
                >
                  {site.phone.display}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-xs text-obsidian-400 transition-colors hover:text-brass-300"
                >
                  Message on WhatsApp
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-ivory-50/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-obsidian-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-ivory-50">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>Developed by {site.developer.name}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans text-xs font-medium tracking-widest text-brass-400 uppercase">
      {children}
    </h2>
  );
}
