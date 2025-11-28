import ArticleCard from "@/components/cards/ArticleCard";
import FeaturedArticleCard from "@/components/cards/FeaturedArticleCard";
import UltimasNoticias from "@/components/UltimasNoticias";
import cloudinaryLoader from "@/lib/cloudinary";
import { generateMetadataObject } from "@/lib/metadata";
import seoData from "@/lib/nextMetadata";
import { getArticles } from "@/services/articles";
import { getHomepage } from "@/services/homepage";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 5;

export async function generateMetadata() {
  const home = await getHomepage();

  if (!home || !home.seo) {
    return seoData;
  }

  return generateMetadataObject(home?.seo);
}

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
    <div className="m-auto flex min-h-screen w-full max-w-[1320px] flex-col items-center px-4 py-10 sm:items-start lg:px-0">
      <Image
        loader={cloudinaryLoader}
        src={topBanner?.image.url || ""}
        alt={""}
        width={1320}
        height={48}
        className="h-auto w-full cursor-pointer"
      />

      {/*First row */}
      <div className="grid max-h-fit w-full grid-cols-1 gap-6 pt-8 lg:grid-cols-2 lg:pt-14">
        {mainArticle && <FeaturedArticleCard {...mainArticle} />}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex w-full flex-col gap-6">
            {articles.slice(0, 2).map((article) => (
              <ArticleCard key={article.id || article.slug} {...article} />
            ))}
          </div>
          <UltimasNoticias />
        </div>
      </div>

      {/*Second row */}
      <div className="grid w-full grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {articles.slice(3, 10).map((article) => (
          <ArticleCard key={article.id || article.slug} {...article} />
        ))}

        <iframe
          src="https://widget.api-futebol.com.br/render/widget_937afd9779c76d45"
          title="API Futebol - Widget"
          width="220"
          height="340"
          style={{
            border: "none",
            borderRadius: "0.25rem",
            background: "transparent",
            width: "100%",
            height: "370px",
          }}
          loading="lazy"
          referrerPolicy="unsafe-url"
          sandbox="allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"
        ></iframe>
      </div>

      {/*Middle banner */}
      <Image
        loader={cloudinaryLoader}
        src={middleBanner?.image.url || ""}
        alt={""}
        width={1320}
        height={510}
        className="h-auto w-full cursor-pointer py-8 lg:py-14"
      />

      {/*Apostas */}
      <div className="flex w-full flex-col gap-5">
        <h2 className="text-2xl font-bold text-heading lg:text-3xl">Apostas</h2>
        <div className="max-h-none lg:max-h-[678px]">
          {betArticle && <FeaturedArticleCard flex="row" {...betArticle} />}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {betArticles.slice(0, 4).map((article) => (
            <ArticleCard key={article.id || article.slug} {...article} />
          ))}
        </div>
      </div>

      {/* Mais lidos */}
      <div className="flex w-full flex-col gap-5 py-8 lg:py-14">
        <h2 className="text-2xl font-bold text-heading lg:text-3xl">Mais lidos</h2>
        <div className="grid grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-2">
          {articles.slice(0, 8).map((article, index) => (
            <Link
              key={article.id || article.slug}
              href={`/artigos/${article.slug}`}
              className={`border- flex flex-row items-center gap-4 rounded-md border border-background bg-card px-5 py-2 lg:gap-6 ${
                index >= 5 ? "hidden lg:flex" : ""
              }`}
            >
              <span className="text-2xl font-bold text-primary-yellow lg:text-4xl">
                {index + 1}
              </span>
              <p className="text-sm font-bold lg:text-base">{article.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
