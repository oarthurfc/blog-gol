import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://golagolesportes.com";

// Force dynamic rendering - sitemap will be generated on each request
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getArticlesForSitemap() {
  const strapiUrl = process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL;

  if (!strapiUrl) {
    console.error("Sitemap: Missing Strapi URL");
    return [];
  }

  try {
    const response = await fetch(
      `${strapiUrl}/api/articles?pagination[pageSize]=1000&fields[0]=slug&fields[1]=publishedAt&sort[0]=publishedAt:desc`,
      {
        cache: "no-store", // Disable caching
        next: { revalidate: 0 },
      },
    );

    if (!response.ok) {
      console.error(`Sitemap: Failed to fetch articles - ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Sitemap: Error fetching articles", error);
    return [];
  }
}

async function getCategoriesForSitemap() {
  const strapiUrl = process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL;

  if (!strapiUrl) {
    console.error("Sitemap: Missing Strapi URL");
    return [];
  }

  try {
    const response = await fetch(`${strapiUrl}/api/categories?fields[0]=slug&fields[1]=updatedAt`, {
      cache: "no-store", // Disable caching
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.error(`Sitemap: Failed to fetch categories - ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Sitemap: Error fetching categories", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch articles and categories in parallel
  const [articles, categories] = await Promise.all([
    getArticlesForSitemap(),
    getCategoriesForSitemap(),
  ]);

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/artigos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/apostas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/termos-e-condicoes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Dynamic article routes
  const articleRoutes: MetadataRoute.Sitemap = articles.map(
    (article: { slug: string; publishedAt?: string }) => ({
      url: `${baseUrl}/artigos/${article.slug}`,
      lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  // Dynamic category routes
  const categoryRoutes: MetadataRoute.Sitemap = categories.map(
    (category: { slug: string; updatedAt?: string }) => ({
      url: `${baseUrl}/categorias/${category.slug}`,
      lastModified: category.updatedAt ? new Date(category.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }),
  );

  console.log(
    `Sitemap generated: ${staticRoutes.length} static, ${articleRoutes.length} articles, ${categoryRoutes.length} categories`,
  );

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes];
}
