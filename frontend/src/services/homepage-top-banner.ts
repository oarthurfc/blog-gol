import fetchContentType from "@/lib/strapi/fetchContentType";
import { StrapiQueryParams } from "@/types";

/**
 * Obter dados da página inicial
 */
export async function getHomepageTopBanner() {
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

  const response = await fetchContentType("home", params, true);
  return response;
}
