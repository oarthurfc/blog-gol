import ArticleCard from "@/components/cards/ArticleCard";
import FeaturedArticleCard from "@/components/cards/FeaturedArticleCard";
import { Button } from "@/components/ui/button";
import cloudinaryLoader from "@/lib/cloudinary";
import { generateMetadataObject } from "@/lib/metadata";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { getHomepage } from "@/services/homepage";
import { HomePageData } from "@/types/home";
import Image from "next/image";

export async function generateMetadata() {
  const homepage = await fetchContentType<HomePageData>(
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
  const home = await getHomepage();

  if (!home) {
    return <div>Erro ao carregar página inicial</div>;
  }

  const mainArticle = home.main_article;
  const betArticle = home.bet_main_article;
  const topBanner = home.top_banner;
  const middleBanner = home.middle_banner;

  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1320px] flex-col items-center py-10 sm:items-start">
      <Image
        loader={cloudinaryLoader}
        src={topBanner.image.url}
        alt={""}
        width={1320}
        height={48}
        className="cursor-pointer"
      />

      {/*First row */}
      <div className="grid w-full grid-cols-2 gap-6 pt-14">
        <FeaturedArticleCard {...mainArticle} />
        <div className="grid grid-cols-2 gap-6">
          <div className="flex w-full flex-col gap-6">
            <ArticleCard {...mainArticle} />

            <ArticleCard {...mainArticle} />
          </div>
          <div className="flex w-full flex-col gap-4 rounded-sm bg-card px-4 py-5">
            <h3 className="text-2xl font-bold text-primary-yellow">Últimas notícias</h3>
            <ul className="pb-2">
              {Array.from({ length: 7 }).map((_, index) => (
                <li key={index + 1} className="flex flex-col border-b py-3 font-bold">
                  <span className="text-xs text-primary-yellow">há 58 minutos</span>
                  {mainArticle.title}
                </li>
              ))}
            </ul>
            <Button>Ver mais</Button>
          </div>
        </div>
      </div>

      {/*Second row */}
      <div className="grid w-full grid-cols-4 grid-rows-2 gap-6 pt-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ArticleCard key={index + 1} {...mainArticle} />
        ))}
      </div>

      {/*Middle banner */}
      <Image
        loader={cloudinaryLoader}
        src={middleBanner.image.url}
        alt={""}
        width={1320}
        height={510}
        className="cursor-pointer py-14"
      />

      {/*Apostas */}
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold text-primary-yellow">Apostas</h2>
        <div className="grid grid-rows-2 gap-6">
          <FeaturedArticleCard flex="row" {...betArticle} />
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <ArticleCard key={index + 1} {...betArticle} />
            ))}
          </div>
        </div>
      </div>

      {/* Mais lidos */}
      <div className="flex w-full flex-col gap-5 py-14">
        <h2 className="text-3xl font-bold text-primary-yellow">Mais lidos</h2>
        <div className="grid grid-cols-2 grid-rows-4 gap-x-4 gap-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`most-read-${index + 1}`}
              className="flex flex-row items-center gap-6 rounded-md border bg-card px-3 py-2"
            >
              <span className="text-4xl font-bold text-primary-yellow">{index + 1}</span>
              <p className="font-bold">De Gea diz que CR7 não é normal e destaca força de Messi</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
