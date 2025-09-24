import fetchContentType from "@/lib/strapi/fetchContentType";
import { HomePageData } from "@/types/home";
import { StrapiQueryParams } from "@/types";
import { populateImage, populateSEO, populateCategory } from "@/lib/strapi/constants";

/**
 * Obter dados da página inicial
 */
export async function getHomepage(): Promise<HomePageData | null> {
  const params: StrapiQueryParams = {
    populate: {
      main_article: {
        populate: {
          image: populateImage(),
          categories: populateCategory(),
          seo: populateSEO(),
        },
      },
    },
  };

  const response = await fetchContentType<HomePageData>("home", params, true);
  return response as HomePageData | null;
}
