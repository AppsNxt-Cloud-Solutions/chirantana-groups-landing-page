/**
 * Capability gate for the hero shader. `prefers-reduced-motion` alone is not
 * enough — most low-end Android users never set it — so this also rejects
 * software rasterizers, data-saver, slow networks and very small devices.
 */
export function canRunShader(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return false;
  if (/(^|-)2g$/.test(nav.connection?.effectiveType ?? "")) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return false;
  if ((navigator.hardwareConcurrency ?? 8) <= 3) return false;

  const probe = document.createElement("canvas");
  // Rejects SwiftShader / llvmpipe — a 4fps full-screen shader pegging the CPU
  // is the single worst outcome.
  const gl = probe.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
  if (!gl) return false;
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return true;
}
