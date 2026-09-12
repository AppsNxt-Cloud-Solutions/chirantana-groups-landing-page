"use client";

import { useEffect, useRef, useState } from "react";
import { FRAGMENT, VERTEX } from "@/lib/shaders/field";
import { cn } from "@/lib/utils";

export type ShaderCanvasProps = {
  /** [r, g, b] in 0–1. Numbers, not CSS — the GPU must never read the cascade. */
  accent: [number, number, number];
  accentDeep: [number, number, number];
  /** 0 = aurora (homepage), 1 = veil (vertical pages). */
  variant: 0 | 1;
  intensity?: number;
  maxDpr?: number;
  fps?: number;
  className?: string;
};

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * The raw WebGL2 renderer. One fullscreen triangle, one fragment shader.
 *
 * Budget rules, each load-bearing on mid-range Android:
 * - DPR capped (1.0 on coarse pointers) plus a hard pixel budget.
 * - Throttled to `fps` (30 by default); time only accrues while rendering.
 * - Paused offscreen (IntersectionObserver) and when the tab is hidden.
 * - Self-healing: if rAF cadence is poor it drops fps and DPR, then gives up
 *   and leaves the CSS gradient underneath.
 * - Full teardown incl. loseContext() — browsers cap live contexts at ~16.
 */
export function ShaderCanvas({
  accent,
  accentDeep,
  variant,
  intensity = 1,
  maxDpr = 1.5,
  fps = 30,
  className,
}: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [generation, setGeneration] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: accent arrays are stable per mount; generation re-inits after context loss
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.parentElement ?? canvas;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: "low-power",
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }
    // biome-ignore lint/correctness/useHookAtTopLevel: WebGL API, not a React hook
    gl.useProgram(program);

    const u = {
      time: gl.getUniformLocation(program, "uTime"),
      resolution: gl.getUniformLocation(program, "uResolution"),
      accent: gl.getUniformLocation(program, "uAccent"),
      accentDeep: gl.getUniformLocation(program, "uAccentDeep"),
      intensity: gl.getUniformLocation(program, "uIntensity"),
      scroll: gl.getUniformLocation(program, "uScroll"),
      pointer: gl.getUniformLocation(program, "uPointer"),
      variant: gl.getUniformLocation(program, "uVariant"),
    };
    gl.uniform3fv(u.accent, accent);
    gl.uniform3fv(u.accentDeep, accentDeep);
    gl.uniform1f(u.intensity, intensity);
    gl.uniform1f(u.variant, variant);

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    if (coarse) dpr = Math.min(dpr, 1);

    let lastW = 0;
    let lastH = 0;
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      // iOS/Android URL-bar collapse produces height-only deltas; ignore them.
      if (coarse && lastW === w && Math.abs(h - lastH) < 120 && lastH) return;
      lastW = w;
      lastH = h;
      // Hard pixel budget — these shaders are low-frequency, the upscale is invisible.
      let d = dpr;
      while (w * h * d * d > 2_200_000 && d > 0.5) d *= 0.85;
      canvas.width = Math.round(w * d);
      canvas.height = Math.round(h * d);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.resolution, canvas.width, canvas.height);
    };
    resize();

    let resizeFrame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resize);
    });
    ro.observe(host);

    // Pointer, fine pointers only. Lerped in the frame loop.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (event: PointerEvent) => {
      pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    if (!coarse) window.addEventListener("pointermove", onPointer, { passive: true });

    let frame = 0;
    let running = false;
    let intersecting = true;
    let fpsCurrent = fps;
    let lastRender = 0;
    let lastRaf = 0;
    let elapsed = 0;
    let rafSamples = 0;
    let rafAccum = 0;
    let healStage = 0;
    let dead = false;
    let drewOnce = false;

    const tick = (now: number) => {
      if (!running) return;
      frame = requestAnimationFrame(tick);

      // Measure the browser's rAF cadence (all callbacks, not just rendered
      // ones). If it's poor the device is struggling — back off, then give up.
      if (lastRaf) {
        rafAccum += Math.min(now - lastRaf, 200);
        rafSamples++;
        if (rafSamples === 60) {
          const mean = rafAccum / 60;
          rafSamples = 0;
          rafAccum = 0;
          if (healStage === 0 && mean > 40) {
            healStage = 1;
            fpsCurrent = 24;
            dpr *= 0.75;
            lastW = 0;
            resize();
          } else if (healStage === 1 && mean > 55) {
            dead = true;
            stop();
            setReady(false);
            return;
          }
        }
      }
      lastRaf = now;

      if (now - lastRender < 1000 / fpsCurrent) return;
      const dt = lastRender ? Math.min(now - lastRender, 100) : 16;
      lastRender = now;
      elapsed += dt / 1000;

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      gl.uniform1f(u.time, elapsed);
      gl.uniform1f(
        u.scroll,
        Math.min(1, window.scrollY / Math.max(1, window.innerHeight)),
      );
      gl.uniform2f(u.pointer, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!drewOnce) {
        drewOnce = true;
        setReady(true);
      }
    };

    const start = () => {
      if (running || dead) return;
      running = true;
      lastRaf = 0;
      lastRender = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    const sync = () => {
      if (intersecting && !document.hidden) start();
      else stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        sync();
      },
      { rootMargin: "200px", threshold: 0 },
    );
    io.observe(host);
    document.addEventListener("visibilitychange", sync);

    const onLost = (event: Event) => {
      event.preventDefault();
      stop();
      setReady(false);
    };
    const onRestored = () => setGeneration((g) => g + 1);
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    sync();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(resizeFrame);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [generation]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000 ease-brand [contain:strict]",
        ready && "opacity-100",
        className,
      )}
    />
  );
}
