"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/button";
import { verticals } from "@/content/verticals";
import { getLenis } from "@/lib/lenis";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation on the native <dialog>. `showModal()` gives the focus
 * trap, Escape handling, inert background and ::backdrop for free. Lenis is
 * stopped while open so the page can't scroll behind the sheet.
 */
export function NavSheet() {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  const open = () => {
    ref.current?.showModal();
    getLenis()?.stop();
  };
  const close = () => ref.current?.close();

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger — close the sheet on navigation
  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onClose = () => {
      const lenis = getLenis();
      lenis?.start();
      lenis?.resize();
    };
    // Click on the backdrop (outside the panel) closes.
    const onClick = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("click", onClick);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={open}
        className="inline-flex size-11 items-center justify-center rounded-pill text-ivory-50 transition-colors hover:bg-ivory-50/10 lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <dialog
        ref={ref}
        aria-label="Menu"
        className="m-0 mr-0 ml-auto h-dvh max-h-none w-[min(22rem,88vw)] max-w-none border-l border-ivory-50/10 bg-obsidian-950 p-0 text-ivory-50 shadow-lift backdrop:bg-obsidian-950/70 backdrop:backdrop-blur-sm open:flex open:flex-col"
      >
        <div className="flex h-18 shrink-0 items-center justify-between border-b border-ivory-50/10 px-5">
          <span className="font-display text-base tracking-[0.14em]">MENU</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="inline-flex size-10 items-center justify-center rounded-pill transition-colors hover:bg-ivory-50/10"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-card px-4 py-3 text-lg transition-colors hover:bg-ivory-50/5",
                pathname === item.href ? "text-brass-300" : "text-ivory-100",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 mb-1 ml-4 border-l border-ivory-50/10 pl-3">
            {verticals.map((v) => (
              <Link
                key={v.slug}
                href={`/verticals/${v.slug}`}
                data-accent={v.accent}
                className="flex items-center gap-3 rounded-card px-3 py-2.5 text-sm text-obsidian-300 transition-colors hover:bg-ivory-50/5 hover:text-ivory-50"
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent-400"
                />
                {v.shortName}
              </Link>
            ))}
          </div>
        </nav>

        <div className="shrink-0 border-t border-ivory-50/10 p-5">
          <ButtonLink href="/contact" variant="onDark" className="w-full">
            Get in touch
          </ButtonLink>
        </div>
      </dialog>
    </>
  );
}
