import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { verticalContact, verticals } from "@/content/verticals";
import { whatsappLink } from "@/lib/site";

/** Per-vertical rows with pre-filled WhatsApp deeplinks. */
export function VerticalContactList() {
  return (
    <Stagger className="divide-y divide-ivory-50/10 border-y border-ivory-50/10">
      {verticals.map((v, i) => (
        <StaggerItem key={v.slug}>
          <a
            href={whatsappLink(verticalContact(v).whatsapp, v.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-accent={v.accent}
            className="group flex items-center gap-6 py-5 transition-colors hover:bg-ivory-50/[0.03] md:gap-10"
          >
            <span className="font-display text-xl text-obsidian-300 tabular-nums">
              0{i + 1}
            </span>
            <span aria-hidden="true" className="size-2 rounded-full bg-accent-400" />
            <span className="flex-1">
              <span className="block font-display text-xl text-ivory-50 md:text-2xl">
                {v.name}
              </span>
              <span className="mt-0.5 block text-sm text-obsidian-300">{v.sector}</span>
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-obsidian-300 transition-colors group-hover:text-accent-300">
              <span className="hidden sm:inline">WhatsApp</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </a>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
