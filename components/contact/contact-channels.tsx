import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CardLink } from "@/components/ui/card";
import { formattedAddress, site, telHref, whatsappHref } from "@/lib/site";

/** Four large link cards. No form, no state. */
export function ContactChannels() {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2">
      <Channel
        href={whatsappHref}
        icon={<MessageCircle aria-hidden="true" className="size-5" />}
        label="WhatsApp"
        value="Message us"
        hint="Usually the quickest way to reach us."
      />
      <Channel
        href={telHref}
        icon={<Phone aria-hidden="true" className="size-5" />}
        label="Call"
        value={site.phone.display}
        hint="Monday to Saturday, office hours."
      />
      <Channel
        href={`mailto:${site.email}`}
        icon={<Mail aria-hidden="true" className="size-5" />}
        label="Email"
        value={site.email}
        hint="For detailed enquiries and documents."
      />
      <Channel
        href={site.mapsUrl}
        icon={<MapPin aria-hidden="true" className="size-5" />}
        label="Visit"
        value={`${site.address.city}, ${site.address.region}`}
        hint={formattedAddress}
      />
    </Stagger>
  );
}

function Channel({
  href,
  icon,
  label,
  value,
  hint,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <StaggerItem className="h-full">
      <CardLink href={href} external className="flex h-full flex-col p-7 md:p-8">
        <span className="flex size-11 items-center justify-center rounded-full bg-accent-100 text-accent-700 transition-colors duration-500 group-hover:bg-accent-600 group-hover:text-ivory-50">
          {icon}
        </span>
        <p className="mt-6 text-xs font-medium tracking-widest text-accent-700 uppercase">
          {label}
        </p>
        <p className="mt-2 font-display text-2xl text-obsidian-900">{value}</p>
        <p className="mt-2 text-sm leading-relaxed text-obsidian-500">{hint}</p>
      </CardLink>
    </StaggerItem>
  );
}
