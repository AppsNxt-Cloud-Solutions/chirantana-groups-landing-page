"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { type AccentKey, accentHex, hexToRgb01 } from "@/content/verticals";
import { canRunShader } from "@/lib/webgl";
import { cn } from "@/lib/utils";

// The only place shader-canvas is imported. `ssr: false` is legal here because
// this file is a client component; in a server component it is a build error.
const ShaderCanvas = dynamic(
  () => import("./shader-canvas").then((m) => m.ShaderCanvas),
  { ssr: false },
);

export type ShaderFieldProps = {
  preset?: "aurora" | "veil";
  /** Which accent tints the field. Defaults to the group peacock. */
  accent?: AccentKey | "peacock";
  intensity?: number;
  className?: string;
};

/**
 * SSR-safe WebGL host. The CSS gradient underneath is in the server HTML and
 * IS the painted element behind the hero text — LCP never waits on a canvas.
 * The canvas mounts after hydration, behind requestIdleCallback, and fades in
 * once it has drawn a frame. If it never does, the gradient is the design.
 */
export function ShaderField({
  preset = "aurora",
  accent = "peacock",
  intensity = 1,
  className,
}: ShaderFieldProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!canRunShader()) return;
    let cancelled = false;
    const start = () => {
      if (!cancelled) setEnabled(true);
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const handle = w.requestIdleCallback
      ? w.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 1200);
    return () => {
      cancelled = true;
      if (w.cancelIdleCallback) w.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  const hex = accentHex[accent];

  return (
    <div
      aria-hidden="true"
      data-accent={accent === "peacock" ? undefined : accent}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-obsidian-900" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_8%,var(--v-700),transparent_62%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_88%_92%,var(--v-500),transparent_60%)] opacity-25" />
      {enabled && (
        <ShaderCanvas
          accent={hexToRgb01(hex[500])}
          accentDeep={hexToRgb01(hex[700])}
          variant={preset === "aurora" ? 0 : 1}
          intensity={intensity}
        />
      )}
    </div>
  );
}
