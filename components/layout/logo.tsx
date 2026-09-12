import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Header lockup: an inline-SVG monogram and the wordmark as live type.
 * No image request, scales cleanly, readable to crawlers.
 *
 * TODO(client): replace the monogram paths with the real mark when supplied.
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
      className={cn("group flex items-center gap-3", className)}
      aria-label={`${site.name} — home`}
    >
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="size-10 transition-transform duration-500 ease-brand group-hover:rotate-6"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className={onDark ? "text-brass-400" : "text-brass-600"}
        />
        <path
          d="M26.5 14.2A8.4 8.4 0 0 0 20 11.5c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5a8.4 8.4 0 0 0 6.5-2.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className={onDark ? "text-ivory-50" : "text-obsidian-900"}
        />
        <circle
          cx="27.5"
          cy="20"
          r="1.4"
          className={onDark ? "fill-brass-400" : "fill-brass-600"}
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg tracking-[0.08em] sm:text-xl",
            onDark ? "text-ivory-50" : "text-obsidian-900",
          )}
        >
          Chirantana
        </span>
        <span
          className={cn(
            "mt-1 text-[0.5625rem] font-medium tracking-widest uppercase",
            onDark ? "text-brass-400" : "text-brass-600",
          )}
        >
          Group
        </span>
      </span>
    </Link>
  );
}
