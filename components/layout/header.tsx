"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { NavSheet } from "@/components/layout/nav-sheet";
import { ButtonLink } from "@/components/ui/button";
import { verticals } from "@/content/verticals";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Fixed header. Every page opens on a dark hero, so the header is transparent
 * at the top and becomes a blurred obsidian bar once scrolled.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-brand",
        scrolled
          ? "border-b border-ivory-50/10 bg-obsidian-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-obsidian-950/60 to-transparent",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) =>
            item.href === "/verticals" ? (
              <VerticalsMenu key={item.href} pathname={pathname} />
            ) : (
              <NavLink key={item.href} href={item.href} pathname={pathname}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/contact"
            size="sm"
            variant="onDark"
            className="hidden sm:inline-flex"
          >
            Get in touch
          </ButtonLink>
          <NavSheet />
        </div>
      </div>
    </header>
  );
}

function isActive(href: string, pathname: string) {
  if (href.startsWith("/#")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  const active = isActive(href, pathname);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-pill px-3.5 py-2 text-sm font-medium transition-colors duration-300",
        active ? "text-peacock-300" : "text-obsidian-200 hover:text-ivory-50",
      )}
    >
      {children}
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-x-3.5 -bottom-0.5 h-px bg-marigold-300"
        />
      )}
    </Link>
  );
}

/** Desktop "Verticals" menu — a real button, click-driven, Escape and outside-click to close. */
function VerticalsMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const active = pathname.startsWith("/verticals");

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-sm font-medium transition-colors duration-300",
          active || open ? "text-peacock-300" : "text-obsidian-200 hover:text-ivory-50",
        )}
      >
        Verticals
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3.5 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute top-full left-1/2 mt-3 w-[26rem] -translate-x-1/2 overflow-hidden rounded-panel border border-ivory-50/10 bg-obsidian-900/95 p-2 shadow-lift backdrop-blur-xl"
      >
        {verticals.map((v, i) => (
          <Link
            key={v.slug}
            href={`/verticals/${v.slug}`}
            data-accent={v.accent}
            onClick={() => setOpen(false)}
            className="group flex items-start gap-4 rounded-card px-3 py-3 transition-colors duration-200 hover:bg-ivory-50/5"
          >
            <span className="mt-1 font-display text-sm text-obsidian-300 tabular-nums">
              0{i + 1}
            </span>
            <span className="flex-1">
              <span className="flex items-center gap-2 text-sm font-medium text-ivory-50">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent-400"
                />
                {v.shortName}
              </span>
              <span className="mt-0.5 block text-xs leading-snug text-obsidian-400 group-hover:text-obsidian-300">
                {v.coreBusiness}
              </span>
            </span>
          </Link>
        ))}
        <Link
          href="/verticals"
          onClick={() => setOpen(false)}
          className="mt-1 block border-t border-ivory-50/10 px-3 pt-3 pb-2 text-xs font-medium tracking-wide text-peacock-300 uppercase transition-colors hover:text-ivory-50"
        >
          All five verticals →
        </Link>
      </div>
    </div>
  );
}
