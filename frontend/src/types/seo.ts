import { StrapiImage } from ".";

export interface SEO {
  id: number;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: StrapiImage;
  keywords?: string;
  metaRobots?: string;
  metaViewport?: string;
  canonicalURL?: string;
  structuredData?: string;
  openGraph?: openGraph;
}

export interface openGraph {
  id: number;
  ogTitle?: string;
  ogDescription?: string;
  ogURL?: string;
  ogType?: string;
  ogImage?: StrapiImage;
}
