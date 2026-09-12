import type Lenis from "lenis";

declare global {
  interface Window {
    __chirantanaHydrated?: boolean;
    __lenis?: Lenis | null;
  }
}

/** The single Lenis instance, exposed by <SmoothScroll/> for the nav sheet. */
export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  return window.__lenis ?? null;
}
