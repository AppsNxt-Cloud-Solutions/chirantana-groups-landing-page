import { ogImageSize, pageOgImage } from "@/components/seo/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "Contact Chirantana Group";

export default function Image() {
  return pageOgImage({ eyebrow: "Contact", title: "Let's talk." });
}
