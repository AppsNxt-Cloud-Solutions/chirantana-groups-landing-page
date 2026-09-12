/**
 * The site's one shader: a domain-warped fBm colour field tinted by the active
 * accent. GLSL lives here as template literals — Turbopack runs no loaders,
 * and this way the source minifies with the chunk.
 */

export const VERTEX = /* glsl */ `#version 300 es
void main() {
  // Fullscreen triangle from gl_VertexID — no attribute buffers, no quad seam.
  vec2 v = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(v * 2.0 - 1.0, 0.0, 1.0);
}`;

export const FRAGMENT = /* glsl */ `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uAccent;
uniform vec3 uAccentDeep;
uniform float uIntensity;
uniform float uScroll;
uniform vec2 uPointer;
uniform float uVariant;

out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.02 + 0.35;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv;
  p.x *= uResolution.x / uResolution.y;

  // aurora (0): broad, slow, drifting. veil (1): tighter, calmer.
  float scale = mix(1.15, 1.9, uVariant);
  float speed = mix(0.055, 0.035, uVariant);
  float t = uTime * speed;

  p *= scale;
  p += uPointer * 0.18;

  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t * 0.8));
  vec2 r = vec2(
    fbm(p + 1.7 * q + vec2(1.7, 9.2) + 0.15 * t),
    fbm(p + 1.7 * q + vec2(8.3, 2.8) + 0.126 * t)
  );
  float f = fbm(p + 2.0 * r);

  vec3 base = vec3(0.078, 0.067, 0.059); // obsidian-900
  vec3 col = mix(base, uAccentDeep, smoothstep(0.25, 0.8, f) * 0.95);
  col = mix(col, uAccent, smoothstep(0.55, 1.0, f * f * 1.7) * 0.6 * uIntensity);

  // Soft vignette, brighter towards the upper-left where the headline sits.
  float vig = 1.0 - 0.6 * length(uv - vec2(0.42, 0.4));
  col *= clamp(vig, 0.0, 1.0);

  // Dim as the hero scrolls away so the transition into the page is quiet.
  col *= 1.0 - 0.4 * uScroll;

  outColor = vec4(col, 1.0);
}`;
