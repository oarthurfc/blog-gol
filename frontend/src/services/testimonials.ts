import { fetchAPI } from '@/lib/strapi';

/**
 * Obter todos os depoimentos
 */
export async function getTestimonials(page: number = 1, pageSize: number = 10, featured: boolean = false) {
  const filters = featured ? { featured: { $eq: true } } : {};
  
  const params = {
    sort: ['createdAt:desc'],
    filters,
    pagination: {
      page,
      pageSize,
    },
    populate: {
      avatar: {
        fields: ['url', 'width', 'height', 'alternativeText'],
      },
    },
  };

  const response = await fetchAPI('/api/testimonials', params);
  return response;
}
