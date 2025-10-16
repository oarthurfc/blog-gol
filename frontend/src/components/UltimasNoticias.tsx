import { formatDateShort } from "@/lib/helpers";
import Link from "next/link";
import { Button } from "./ui/button";
import { getArticles } from "@/services/articles";
import Image from "next/image";
import cloudinaryLoader from "@/lib/cloudinary";

export default async function UltimasNoticias() {
  const articles = await getArticles(1, 15);

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 rounded-sm bg-card px-4 py-5 lg:max-h-[768px]">
      <div className="flex max-h-[90%] flex-col gap-2">
        <h3 className="text-xl font-bold text-heading lg:text-2xl">Últimas notícias</h3>
        <ul className="overflow-y-auto pb-2">
          {articles.slice(3, 15).map((article) => (
            <Link
              href={`/artigos/${article.slug}`}
              key={article.id || article.slug}
              className="flex flex-row items-center gap-3 border-b py-3 font-bold"
            >
              {/* Thumbnail da imagem */}
              <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded">
                {article.image?.url ? (
                  <Image
                    loader={cloudinaryLoader}
                    src={article.image.url}
                    alt={article.image.alternativeText || article.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 dark:bg-gray-700"></div>
                )}
              </div>

              {/* Conteúdo do texto */}
              <div className="flex flex-1 flex-col">
                <span className="text-xs text-heading">{formatDateShort(article.publishedAt)}</span>
                <span className="line-clamp-2 text-xs lg:text-sm">{article.title}</span>
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <Button className="text-sm text-gray-900 lg:text-base">Ver mais</Button>
    </div>
  );
}
