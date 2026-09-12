import type { ElementType, ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import type { AccentKey } from "@/content/verticals";
import { cn } from "@/lib/utils";

/* ── Section shell ────────────────────────────────────────────────────────── */

type Tone = "light" | "alt" | "obsidian" | "void";

const tones: Record<Tone, string> = {
  light: "bg-surface text-obsidian-700",
  alt: "bg-surface-alt text-obsidian-700",
  obsidian: "bg-obsidian-900 text-obsidian-200",
  void: "bg-obsidian-950 text-obsidian-200",
};

export function Section({
  children,
  className,
  tone = "light",
  id,
  size = "md",
  accent,
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
  size?: "sm" | "md" | "lg";
  /** Rebinds the accent-* utilities inside this section to a vertical's hue. */
  accent?: AccentKey;
}) {
  const padding = {
    sm: "py-14 md:py-20",
    md: "py-20 md:py-28",
    lg: "py-24 md:py-40",
  }[size];

  return (
    <section
      id={id}
      data-accent={accent}
      className={cn("relative", tones[tone], padding, className)}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Tag = as;
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}

/* ── Eyebrow ──────────────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  className,
  onDark,
}: {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-xs font-medium tracking-widest uppercase",
        onDark ? "text-accent-300" : "text-accent-700",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-8", onDark ? "bg-accent-300/60" : "rule-accent")}
      />
      {children}
    </span>
  );
}

/* ── Section heading ──────────────────────────────────────────────────────── */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark,
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  as?: ElementType;
}) {
  const Tag = as;
  return (
    <Reveal
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <Eyebrow onDark={onDark} className="mb-6">
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        className={cn(
          "text-4xl text-balance-tight",
          onDark ? "text-ivory-50" : "text-obsidian-900",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <div
          className={cn(
            "mt-6 text-lg leading-relaxed",
            onDark ? "text-obsidian-300" : "text-obsidian-500",
          )}
        >
          {intro}
        </div>
      )}
    </Reveal>
  );
}
