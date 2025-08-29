import ArticleCard from "@/components/cards/ArticleCard";
import FeaturedArticleCard from "@/components/cards/FeaturedArticleCard";
import { Button } from "@/components/ui/button";
import { generateMetadataObject } from "@/lib/metadata";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { strapiImage } from "@/lib/strapi/strapiImage";
import Image from "next/image";

export async function generateMetadata() {
  const homepage = await fetchContentType(
    "home",
    {
      populate: {
        seo: { populate: "*" },
      },
    },
    true,
  );
  return generateMetadataObject(homepage?.seo);
}

export default async function Home() {
  const homepage = await fetchContentType(
    "home",
    {
      populate: {
        top_banner: { populate: "*" },
        main_article: { populate: "*" },
        middle_banner: { populate: "*" },
        bet_main_article: { populate: "*" },
      },
    },
    true,
  );

  console.log("Homepage", homepage);

  return (
    <main className="m-auto flex min-h-screen w-full max-w-[1320px] flex-col items-center gap-8 py-10 sm:items-start">
      <Image src={strapiImage(homepage.top_banner.image.url)} alt={""} width={1320} height={48} />

      {/*First row */}
      <div className="flex w-full gap-6">
        <FeaturedArticleCard
          id={homepage.main_article.id}
          title={homepage.main_article.title}
          description={homepage.main_article.description}
          slug={homepage.main_article.slug}
          image={homepage.main_article.image}
          categories={homepage.main_article.categories}
          content={homepage.main_article.content}
          documentId={homepage.main_article.documentId}
          createdAt={homepage.main_article.createdAt}
          updatedAt={homepage.main_article.updatedAt}
          publishedAt={homepage.main_article.publishedAt}
          dynamic_zone={homepage.main_article.dynamic_zone}
          seo={homepage.main_article.seo}
        />
        <div className="flex max-w-80 flex-col gap-6">
          <ArticleCard
            id={homepage.main_article.id}
            title={homepage.main_article.title}
            description={homepage.main_article.description}
            slug={homepage.main_article.slug}
            image={homepage.main_article.image}
            categories={homepage.main_article.categories}
            content={homepage.main_article.content}
            documentId={homepage.main_article.documentId}
            createdAt={homepage.main_article.createdAt}
            updatedAt={homepage.main_article.updatedAt}
            publishedAt={homepage.main_article.publishedAt}
            dynamic_zone={homepage.main_article.dynamic_zone}
            seo={homepage.main_article.seo}
          />
          <ArticleCard
            id={homepage.main_article.id}
            title={homepage.main_article.title}
            description={homepage.main_article.description}
            slug={homepage.main_article.slug}
            image={homepage.main_article.image}
            categories={homepage.main_article.categories}
            content={homepage.main_article.content}
            documentId={homepage.main_article.documentId}
            createdAt={homepage.main_article.createdAt}
            updatedAt={homepage.main_article.updatedAt}
            publishedAt={homepage.main_article.publishedAt}
            dynamic_zone={homepage.main_article.dynamic_zone}
            seo={homepage.main_article.seo}
          />
        </div>
        <div className="flex w-80 flex-col rounded-sm bg-card px-4 py-5">
          <h3 className="text-primary-yellow text-2xl font-bold">Últimas notícias</h3>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <Button>Ver mais</Button>
        </div>
      </div>
    </main>
  );
}
