import ArticleCard from "@/components/cards/ArticleCard";
import FeaturedArticleCard from "@/components/cards/FeaturedArticleCard";
import UltimasNoticias from "@/components/UltimasNoticias";
import cloudinaryLoader from "@/lib/cloudinary";
import { generateMetadataObject } from "@/lib/metadata";
import { getArticles } from "@/services/articles";
import { getHomepage } from "@/services/homepage";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 5;

export default async function Home() {
  const home = await getHomepage();

  generateMetadataObject(home?.seo);

  const topBanner = home?.top_banner;
  const mainArticle = home?.main_article;
  const middleBanner = home?.middle_banner;
  const betArticle = home?.bet_main_article;

  const articles = await getArticles(1, 25, {
    id: {
      $ne: mainArticle?.id,
    },
  });

  const betArticles = await getArticles(1, 25, {
    categories: {
      slug: {
        $eq: "aposta",
      },
    },
    id: {
      $ne: betArticle?.id,
    },
  });

  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1320px] flex-col items-center py-10 sm:items-start">
      <Image
        loader={cloudinaryLoader}
        src={topBanner?.image.url || ""}
        alt={""}
        width={1320}
        height={48}
        className="cursor-pointer"
      />

      {/*First row */}
      <div className="grid max-h-fit w-full grid-cols-2 gap-6 pt-14">
        {mainArticle && <FeaturedArticleCard {...mainArticle} />}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex w-full flex-col gap-6">
            {articles.slice(0, 2).map((article) => (
              <ArticleCard key={article.id || article.slug} {...article} />
            ))}
          </div>
          <UltimasNoticias />
        </div>
      </div>

      {/*Second row */}
      <div className="grid w-full grid-cols-4 grid-rows-2 gap-6 pt-6">
        {articles.slice(3, 11).map((article) => (
          <ArticleCard key={article.id || article.slug} {...article} />
        ))}
      </div>

      {/*Middle banner */}
      <Image
        loader={cloudinaryLoader}
        src={middleBanner?.image.url || ""}
        alt={""}
        width={1320}
        height={510}
        className="cursor-pointer py-14"
      />

      {/*Apostas */}
      <div className="flex w-full flex-col gap-5">
        <h2 className="text-3xl font-bold text-heading">Apostas</h2>
        <div className="max-h-[678px]">
          {betArticle && <FeaturedArticleCard flex="row" {...betArticle} />}
        </div>
        <div className="grid grid-cols-4 gap-6">
          {betArticles.slice(0, 4).map((article) => (
            <ArticleCard key={article.id || article.slug} {...article} />
          ))}
        </div>
      </div>

      {/* Mais lidos */}
      <div className="flex w-full flex-col gap-5 py-14">
        <h2 className="text-3xl font-bold text-heading">Mais lidos</h2>
        <div className="grid grid-cols-2 grid-rows-4 gap-x-4 gap-y-2">
          {articles.slice(0, 8).map((article, index) => (
            <Link
              key={article.id || article.slug}
              href={`/articles/${article.slug}`}
              className="border- flex flex-row items-center gap-6 rounded-md border border-background bg-card px-3 py-2"
            >
              <span className="text-4xl font-bold text-primary-yellow">{index + 1}</span>
              <p className="font-bold">{article.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
