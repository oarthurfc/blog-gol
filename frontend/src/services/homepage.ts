import { fetchAPI } from '@/lib/strapi';

/**
 * Obter dados da página inicial
 */
export async function getHomepage() {
  const params = {
    populate: {
      banners: {
        populate: '*',
      },
      featuredArticles: {
        populate: {
          articles: {
            populate: {
              coverImage: {
                fields: ['url', 'width', 'height', 'alternativeText'],
              },
              category: {
                populate: ['name', 'slug'],
              },
              author: {
                populate: ['name', 'avatar'],
              },
            },
          },
        },
      },
      testimonials: {
        populate: {
          testimonials: {
            populate: ['avatar'],
          },
        },
      },
      seo: {
        populate: '*',
      },
    },
  };

  const response = await fetchAPI('/api/home', params);
  return response.data;
}
