import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-300 ease-brand rounded-pill whitespace-nowrap disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-obsidian-900 text-ivory-50 hover:bg-obsidian-800 hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0",
  accent:
    "bg-accent-600 text-ivory-50 hover:bg-accent-700 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0",
  outline:
    "border border-obsidian-300 bg-transparent text-obsidian-800 hover:border-accent-500 hover:text-accent-700 hover:-translate-y-0.5",
  ghost: "text-obsidian-700 hover:text-accent-700",
  onDark:
    "border border-ivory-50/20 bg-ivory-50/5 text-ivory-50 backdrop-blur-sm hover:border-ivory-50 hover:bg-ivory-50 hover:text-obsidian-900 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
