import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. Pure CSS: the track is duplicated and translated
 * by -50% on a loop, so it never seams. Pauses on hover; the global
 * reduced-motion rule stills it entirely.
 */
export function Marquee({
  children,
  className,
  trackClassName,
  reverse,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  reverse?: boolean;
}) {
  return (
    <div className={cn("group/marquee overflow-hidden edge-fade", className)}>
      <div
        className={cn(
          "flex w-max animate-marquee will-change-transform group-hover/marquee:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
          trackClassName,
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
