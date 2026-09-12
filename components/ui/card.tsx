import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** One card implementation for the whole site. */

export function Card({
  children,
  className,
  interactive,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-panel",
        tone === "light"
          ? "bg-surface hairline"
          : "border border-ivory-50/10 bg-ivory-50/[0.04]",
        interactive &&
          "transition-all duration-500 ease-brand hover:-translate-y-1 hover:shadow-glow",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Card whose whole surface is a link. */
export function CardLink({
  href,
  children,
  className,
  external,
  tone = "light",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  tone?: "light" | "dark";
  ariaLabel?: string;
}) {
  const classes = cn(
    "group relative block overflow-hidden rounded-panel transition-all duration-500 ease-brand hover:-translate-y-1",
    tone === "light"
      ? "bg-surface hairline hover:shadow-glow"
      : "border border-ivory-50/10 bg-ivory-50/[0.04] hover:border-accent-400/60",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

/** Numbered feature card with an accent rule — used for offerings. */
export function FeatureCard({
  index,
  title,
  children,
  icon,
  className,
}: {
  index?: number;
  title: string;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Card interactive className={cn("group h-full p-7 md:p-8", className)}>
      <div className="flex items-start justify-between gap-4">
        {icon && (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700 transition-colors duration-500 group-hover:bg-accent-600 group-hover:text-ivory-50">
            {icon}
          </span>
        )}
        {index !== undefined && (
          <span
            aria-hidden="true"
            className="font-display text-2xl leading-none text-obsidian-500 tabular-nums"
          >
            {String(index).padStart(2, "0")}
          </span>
        )}
      </div>
      <h3 className="mt-6 text-xl">{title}</h3>
      <span aria-hidden="true" className="mt-4 block h-px w-10 rule-accent" />
      {children && (
        <div className="mt-4 text-[0.95rem] leading-relaxed text-obsidian-500">
          {children}
        </div>
      )}
    </Card>
  );
}
