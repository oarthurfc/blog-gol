import fetchContentType from "@/lib/strapi/fetchContentType";

/**
 * Obter todos os depoimentos
 */
export async function getTestimonials(
  page: number = 1,
  pageSize: number = 10,
  featured: boolean = false,
) {
  const filters = featured ? { featured: { $eq: true } } : {};

  return await fetchContentType("testimonials", {
    sort: ["createdAt:desc"],
    filters,
    pagination: {
      page,
      pageSize,
    },
    populate: {
      avatar: {
        fields: ["url", "width", "height", "alternativeText"],
      },
    },
  });
}
