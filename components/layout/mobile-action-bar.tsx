"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { getVertical, verticalContact } from "@/content/verticals";
import { site, whatsappLink } from "@/lib/site";

/**
 * Sticky call / WhatsApp / email bar, mobile only. This market converts on
 * calls, and on a vertical page the call should reach that vertical's own line
 * where it runs one — so the bar follows the route.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const vertical = getVertical(pathname.replace("/verticals/", ""));
  const contact = vertical
    ? verticalContact(vertical)
    : { phone: site.phone, whatsapp: site.whatsapp, email: site.email };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ivory-50/10 bg-obsidian-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden">
      <div className="grid grid-cols-3 divide-x divide-ivory-50/10">
        <a
          href={`tel:${contact.phone.e164}`}
          className="flex flex-col items-center gap-1 py-3 text-ivory-50 transition-colors active:bg-ivory-50/10"
          aria-label={`Call ${contact.phone.display}`}
        >
          <Phone aria-hidden="true" className="size-4 text-peacock-400" />
          <span className="text-2xs font-semibold tracking-[0.12em] uppercase">Call</span>
        </a>
        <a
          href={whatsappLink(contact.whatsapp, vertical?.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-ivory-50 transition-colors active:bg-ivory-50/10"
        >
          <MessageCircle aria-hidden="true" className="size-4 text-peacock-400" />
          <span className="text-2xs font-semibold tracking-[0.12em] uppercase">
            WhatsApp
          </span>
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="flex flex-col items-center gap-1 py-3 text-ivory-50 transition-colors active:bg-ivory-50/10"
        >
          <Mail aria-hidden="true" className="size-4 text-peacock-400" />
          <span className="text-2xs font-semibold tracking-[0.12em] uppercase">
            Email
          </span>
        </a>
      </div>
    </div>
  );
}
