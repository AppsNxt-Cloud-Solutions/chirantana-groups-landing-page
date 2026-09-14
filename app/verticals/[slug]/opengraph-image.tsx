import { ogImageSize, pageOgImage } from "@/components/seo/og-image";
import { accentHex, getVertical } from "@/content/verticals";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "Chirantana Group";

/** Next 16: the image function receives params as a Promise. */
export default async function Image({ params }: PageProps<"/verticals/[slug]">) {
  const { slug } = await params;
  const vertical = getVertical(slug);
  const hex = accentHex[vertical?.accent ?? "peacock"];
  return pageOgImage({
    eyebrow: vertical?.sector ?? "Chirantana Group",
    title: vertical?.name ?? "Chirantana Group",
    footerRight: vertical?.tagline,
    accent: hex[300],
    accentDeep: hex[700],
  });
}
