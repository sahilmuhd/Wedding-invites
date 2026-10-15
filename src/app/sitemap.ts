import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

// Absolute URLs need the real domain. Until NEXT_PUBLIC_SITE_URL is set the sitemap is empty.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!brand.siteUrl) return [];
  return [{ url: `${brand.siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
