import { ogImageSize, pageOgImage } from "@/components/seo/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "Chirantana Group — our five verticals";

export default function Image() {
  return pageOgImage({
    eyebrow: "Our verticals",
    title: "Five verticals. One connected purpose.",
  });
}
