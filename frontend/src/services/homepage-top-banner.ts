import fetchContentType from "@/lib/strapi/fetchContentType";
import { HomePageData } from "@/types/home";
import { StrapiQueryParams } from "@/types";
import { populateImage } from "@/lib/strapi/constants";

/**
 * Obter dados da página inicial
 */
export async function getHomepage(): Promise<HomePageData | null> {
  const params: StrapiQueryParams = {
    populate: {
      populate: {
        top_banner: {
          populate: {
            image: true,
          },
        },
      },
    },
  };

  const response = await fetchContentType<HomePageData>("home", params, true);
  return response as HomePageData | null;
}
