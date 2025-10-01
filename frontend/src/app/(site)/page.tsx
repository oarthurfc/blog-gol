import ArticleCard from "@/components/cards/ArticleCard";
import FeaturedArticleCard from "@/components/cards/FeaturedArticleCard";
import { Button } from "@/components/ui/button";
import cloudinaryLoader from "@/lib/cloudinary";
import { formatDateShort } from "@/lib/helpers";
import { generateMetadataObject } from "@/lib/metadata";
import { getArticles } from "@/services/articles";
import { getHomepage } from "@/services/homepage";
import Image from "next/image";

export default async function Home() {
  const home = await getHomepage();
  const articles = await getArticles(1, 30); // Fetch more articles for all sections

  generateMetadataObject(home?.seo);

  const mainArticle = home?.main_article;
  const betArticle = home?.bet_main_article;
  const topBanner = home?.top_banner;
  const middleBanner = home?.middle_banner;

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
      <div className="grid w-full grid-cols-2 gap-6 pt-14">
        {mainArticle && <FeaturedArticleCard {...mainArticle} />}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex w-full flex-col gap-6">
            {articles.slice(0, 2).map((article) => (
              <ArticleCard key={article.id || article.slug} {...article} />
            ))}
          </div>
          <div className="flex w-full flex-col gap-4 rounded-sm bg-card px-4 py-5">
            <h3 className="text-2xl font-bold text-primary-yellow">Últimas notícias</h3>
            <ul className="pb-2">
              {articles.slice(2, 7).map((article) => (
                <li
                  key={article.id || article.slug}
                  className="flex flex-col border-b py-3 font-bold"
                >
                  <span className="text-xs text-primary-yellow">
                    {formatDateShort(article.publishedAt)}
                  </span>
                  {article.title}
                </li>
              ))}
            </ul>
            <Button>Ver mais</Button>
          </div>
        </div>
      </div>

      {/*Second row */}
      <div className="grid w-full grid-cols-4 grid-rows-2 gap-6 pt-6">
        {articles.slice(2, 7).map((article) => (
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
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold text-primary-yellow">Apostas</h2>
        <div className="grid grid-rows-2 gap-6">
          {betArticle && <FeaturedArticleCard flex="row" {...betArticle} />}
          <div className="grid grid-cols-4 gap-6">
            {articles.slice(2, 7).map((article) => (
              <ArticleCard key={article.id || article.slug} {...article} />
            ))}
          </div>
        </div>
      </div>

      {/* Mais lidos */}
      <div className="flex w-full flex-col gap-5 py-14">
        <h2 className="text-3xl font-bold text-primary-yellow">Mais lidos</h2>
        <div className="grid grid-cols-2 grid-rows-4 gap-x-4 gap-y-2">
          {articles.slice(2, 8).map((article, index) => (
            <div
              key={article.id || article.slug}
              className="flex flex-row items-center gap-6 rounded-md border bg-card px-3 py-2"
            >
              <span className="text-4xl font-bold text-primary-yellow">{index + 1}</span>
              <p className="font-bold">{article.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
