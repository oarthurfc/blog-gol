import { formatDateShort } from "@/lib/helpers";
import Link from "next/link";
import { Button } from "./ui/button";
import { getArticles } from "@/services/articles";

export default async function UltimasNoticias() {
  const articles = await getArticles(1, 15);
  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 rounded-sm bg-card px-4 py-5 lg:max-h-[768px]">
      <div className="flex max-h-[95%] flex-col gap-2">
        <h3 className="text-xl font-bold text-heading lg:text-2xl">Últimas notícias</h3>
        <ul className="overflow-y-auto pb-2">
          {articles.slice(3, 15).map((article) => (
            <Link
              href={`/artigos/${article.slug}`}
              key={article.id || article.slug}
              className="flex flex-col border-b py-3 font-bold"
            >
              <span className="text-xs text-heading">{formatDateShort(article.publishedAt)}</span>
              <span className="text-sm lg:text-base">{article.title}</span>
            </Link>
          ))}
        </ul>
      </div>
      <Button className="text-sm text-gray-900 lg:text-base">Ver mais</Button>
    </div>
  );
}
