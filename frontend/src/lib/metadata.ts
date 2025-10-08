import { Author } from "@/types/author";
import { SEO } from "@/types/seo";

export function generateMetadataObject(seo?: SEO, author?: Author, publishedAt?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://golagolesportes.com";

  const title = seo?.metaTitle || "Gol a Gol | Notícias de Futebol e Jogos de Esporte";
  const description =
    seo?.metaDescription ||
    "Fique por dentro do futebol nacional e internacional. Notícias, resultados, palpites e novidades sobre Jogos de Esporte você encontra aqui.";
  const imageUrl = seo?.openGraph?.ogImage?.url
    ? seo.openGraph.ogImage.url
    : "https://res.cloudinary.com/dq2kgghmy/image/upload/v1759889663/meta_image_gol_a_gol_e007a81856.jpg";

  // constrói um possível link de autor, caso no futuro você tenha uma rota /autor/username
  const authorUrl = author?.username ? `${baseUrl}/autor/${author.username}` : undefined;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      locale: "pt_BR",
      title: seo?.openGraph?.ogTitle || title,
      description: seo?.openGraph?.ogDescription || description,
      url: seo?.openGraph?.ogURL || baseUrl,
      publishedTime: publishedAt || undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: seo?.openGraph?.ogImage?.alternativeText || title,
        },
      ],
      article: {
        publishedTime: publishedAt || undefined,
        author: authorUrl ? [authorUrl] : undefined, // OGP espera URL
      },
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: author?.username ? `@${author.username}` : undefined,
    },
  };
}
