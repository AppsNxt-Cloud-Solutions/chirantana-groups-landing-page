import Image from "next/image";
import Link from "next/link";
import mark from "@/assets/images/brand/logo-mark.png";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Header lockup: the Chirantana mark beside the wordmark as live type.
 *
 * The mark is a transparent disc cut from the supplied artwork, so it sits on
 * the obsidian header and on ivory without a plate behind it. It is decorative
 * here — the link already carries an accessible name — hence alt="".
 */
export function Logo({
  className,
  onDark = true,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3 sm:gap-3.5", className)}
      aria-label={`${site.name} — home`}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative block size-11 shrink-0 rounded-full transition-transform duration-500 ease-brand group-hover:scale-105 sm:size-12",
          // A hairline ring carries the mark's own ring onto both grounds.
          onDark ? "ring-1 ring-ivory-50/15" : "ring-1 ring-obsidian-900/10",
        )}
      >
        <Image
          src={mark}
          alt=""
          width={48}
          height={48}
          priority
          sizes="48px"
          className="size-full rounded-full object-contain"
        />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl tracking-[0.05em] sm:text-2xl",
            onDark ? "text-ivory-50" : "text-obsidian-900",
          )}
        >
          Chirantana
        </span>
        <span
          className={cn(
            "mt-1.5 text-2xs font-medium tracking-widest uppercase sm:text-xs",
            onDark ? "text-peacock-300" : "text-peacock-700",
          )}
        >
          Group
        </span>
      </span>
    </Link>
  );
}
