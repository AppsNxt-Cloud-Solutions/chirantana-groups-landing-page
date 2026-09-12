import { ogImageSize, pageOgImage } from "@/components/seo/og-image";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return pageOgImage({
    eyebrow: "Chirantana Group",
    title: "Creating value. Building trust. Connecting people.",
    footerRight: "Five verticals, one foundation",
  });
}
