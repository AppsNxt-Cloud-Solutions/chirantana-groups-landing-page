"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Lenis smooth scrolling.
 *
 * - Disabled entirely under `prefers-reduced-motion`.
 * - Reset to the top on route change: Next 16 no longer overrides
 *   `scroll-behavior` during navigation and Lenis holds its own position.
 * - Exposed on `window.__lenis` so the mobile nav sheet can stop/start it.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Tells the inline fallback in the document head that hydration succeeded,
  // so it leaves the reveal animations alone. See app/layout.tsx.
  useEffect(() => {
    window.__chirantanaHydrated = true;
    document.documentElement.removeAttribute("data-motion-fallback");
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      // Native momentum on touch is better than an emulated one.
      syncTouch: false,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anchor links scroll through Lenis, clearing the fixed header.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest?.(
        'a[href^="#"], a[href^="/#"]',
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const id = href.slice(href.indexOf("#") + 1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -88 });
    };
    document.addEventListener("click", onAnchorClick);

    // Lenis caches document height; sections that reveal/expand change it.
    const observer = new ResizeObserver(() => lenis.resize());
    observer.observe(document.body);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      observer.disconnect();
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a value the body reads
  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
