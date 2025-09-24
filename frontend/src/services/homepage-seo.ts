import fetchContentType from "@/lib/strapi/fetchContentType";
import { HomePageData } from "@/types/home";
import { StrapiQueryParams } from "@/types";
import { populateSEO } from "@/lib/strapi/constants";

/**
 * Obter dados da página inicial
 */
export async function getHomepage(): Promise<HomePageData | null> {
  const params: StrapiQueryParams = {
    populate: {
      seo: populateSEO(),
    },
  };

  const response = await fetchContentType<HomePageData>("home", params, true);
  return response as HomePageData | null;
}
