import { strapiImage } from './strapi/strapiImage';

export function generateMetadataObject(seo: any = {}) {
  return {
    title: seo.metaTitle || seo.title || 'Default Title',
    description: seo.metaDescription || 'Default Description',
    openGraph: {
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      images: seo.metaImage ? [{ url: strapiImage(seo.metaImage.url) }] : [],
    },
    twitter: {
      card: seo.twitterCard || 'summary_large_image',
      title: seo.twitterTitle || seo.metaTitle,
      description: seo.twitterDescription || seo.metaDescription,
      images: seo.twitterImage ? [{ url: seo.twitterImage }] : [],
    },
  };
}
