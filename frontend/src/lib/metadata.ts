import { SEO } from "@/types/seo";

export function generateMetadataObject(seo?: SEO) {
  return {
    title: seo?.metaTitle || "Default Title",
    description: seo?.metaDescription || "Default Description",
    openGraph: {
      title: seo?.openGraph?.ogTitle || "Default OgTitle",
      description: seo?.openGraph?.ogDescription || "Default Description",
      images: seo?.openGraph?.ogImage ? [{ url: seo.openGraph.ogImage.url }] : [],
    },
    twitter: {
      card: seo?.openGraph?.ogImage || "summary_large_image",
      title: seo?.metaTitle || "Default Title",
      description: seo?.metaDescription || "Default Description",
      images: seo?.openGraph?.ogImage ? [{ url: seo.openGraph?.ogImage }] : [],
    },
  };
}
