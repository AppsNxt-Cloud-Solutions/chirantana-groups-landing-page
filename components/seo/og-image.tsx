import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/** Shared layout for per-route share cards. The accent tints the rule + eyebrow. */
export const ogImageSize = { width: 1200, height: 630 };

export function pageOgImage({
  eyebrow,
  title,
  footerRight,
  accent = "#64bdc2",
  accentDeep = "#0a5e62",
}: {
  eyebrow: string;
  title: string;
  footerRight?: string;
  accent?: string;
  accentDeep?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: `radial-gradient(120% 90% at 18% 8%, ${accentDeep} 0%, #14110f 62%)`,
        color: "#fbf9f5",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: 56, height: 2, background: accent }} />
        <span
          style={{
            color: accent,
            fontSize: 20,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
      </div>

      <span
        style={{
          fontSize: title.length > 44 ? 58 : 72,
          lineHeight: 1.05,
          display: "flex",
          maxWidth: 960,
        }}
      >
        {title}
      </span>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#b3a89d",
          fontSize: 22,
        }}
      >
        <span>{site.name}</span>
        <span>{footerRight ?? "Tumkur, Karnataka"}</span>
      </div>
    </div>,
    ogImageSize,
  );
}
