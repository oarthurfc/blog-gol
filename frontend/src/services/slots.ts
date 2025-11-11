import fetchContentType from "@/lib/strapi/fetchContentType";
import { ApostasPageData } from "@/types/apostas";
import { StrapiQueryParams } from "@/types";
import { populateCategory } from "@/lib/strapi/constants";

/**
 * Obter dados da página de slots
 */
export async function getSlotsPage(): Promise<ApostasPageData | null> {
  const params: StrapiQueryParams = {
    populate: {
      bets: {
        populate: "*",
        sort: ["ranking:asc"],
      },
      testimonials: {
        populate: "*",
      },
      faqs: true,
      categories: populateCategory(),
    },
  };

  const response = await fetchContentType<ApostasPageData>("slot", params, true);
  return response as ApostasPageData | null;
}
