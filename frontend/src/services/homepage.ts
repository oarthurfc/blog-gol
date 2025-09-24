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
      populate: "*", // Adicione esta linha para garantir que os dados sejam populados
      top_banner: {
        populate: {
          image: {
            fields: [
              "id",
              "name",
              "alternativeText",
              "caption",
              "url",
              "width",
              "height",
              "provider",
            ],
          },
        },
      },
      main_article: {
        populate: {
          image: {
            fields: [
              "id",
              "name",
              "alternativeText",
              "caption",
              "url",
              "width",
              "height",
              "provider",
            ],
          },
          categories: { fields: ["name", "slug"] },
          seo: {
            populate: {
              openGraph: {
                populate: {
                  ogImage: {
                    fields: [
                      "id",
                      "name",
                      "alternativeText",
                      "caption",
                      "url",
                      "width",
                      "height",
                      "provider",
                    ],
                  },
                },
              },
              metaImage: {
                fields: [
                  "id",
                  "name",
                  "alternativeText",
                  "caption",
                  "url",
                  "width",
                  "height",
                  "provider",
                ],
              },
            },
          },
        },
      },
      middle_banner: {
        populate: {
          image: {
            fields: [
              "id",
              "name",
              "alternativeText",
              "caption",
              "url",
              "width",
              "height",
              "provider",
            ],
          },
        },
      },
      bet_main_article: {
        populate: {
          image: {
            fields: [
              "id",
              "name",
              "alternativeText",
              "caption",
              "url",
              "width",
              "height",
              "provider",
            ],
          },
          categories: { fields: ["name", "slug"] },
          seo: {
            populate: {
              openGraph: {
                populate: {
                  ogImage: {
                    fields: [
                      "id",
                      "name",
                      "alternativeText",
                      "caption",
                      "url",
                      "width",
                      "height",
                      "provider",
                    ],
                  },
                },
              },
              metaImage: {
                fields: [
                  "id",
                  "name",
                  "alternativeText",
                  "caption",
                  "url",
                  "width",
                  "height",
                  "provider",
                ],
              },
            },
          },
        },
      },
    },
  };

  const response = await fetchContentType<HomePageData>("home", params, true);
  return response as HomePageData | null;
}
