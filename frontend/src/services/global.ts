import fetchContentType from "@/lib/strapi/fetchContentType";
import { StrapiQueryParams } from "@/types";
import { populateImage } from "@/lib/strapi/constants";

// Tipos específicos para o content type Global
export interface NavbarData {
  logo: {
    url: string;
    alternativeText?: string;
  };
  right_navbar_items: {
    id: string;
    URL: string;
    text: string;
    target?: string;
  }[];
}

export interface GlobalSeo {
  metaTitle: string;
  metaDescription: string;
  metaImage?: unknown;
}

export interface FooterData {
  id: number;
  logo: {
    url: string;
  };
  description?: string;
  copyright?: string;
  internal_links?: FooterLink[];
  policy_links?: FooterLink[];
}

interface FooterLink {
  id: number;
  text: string;
  URL?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface GlobalData {
  id: number;
  seo: GlobalSeo;
  navbar: NavbarData;
  footer: FooterData;
}

/**
 * Obter dados globais (navbar, footer, SEO padrão)
 */
export async function getGlobalData(): Promise<GlobalData | null> {
  const params: StrapiQueryParams = {
    populate: {
      navbar: {
        populate: {
          logo: populateImage(),
          right_navbar_items: true,
        },
      },
      footer: {
        populate: {
          logo: populateImage(),
          internal_links: true,
          policy_links: true,
        },
      },
      seo: {
        populate: {
          metaImage: populateImage(),
        },
      },
    },
  };

  const response = await fetchContentType<GlobalData>("global", params, true);
  return response as GlobalData | null;
}
