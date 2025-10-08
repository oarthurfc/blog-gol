import { formatDateShort } from "@/lib/helpers";
import Link from "next/link";
import { Button } from "./ui/button";
import { getArticles } from "@/services/articles";

export default async function UltimasNoticias() {
  const articles = await getArticles(1, 15);
  return (
    <div className="flex h-full max-h-[768px] w-full flex-col justify-between gap-4 rounded-sm bg-card px-4 py-5">
      <div className="flex max-h-[95%] flex-col gap-2">
        <h3 className="text-heading text-2xl font-bold">Últimas notícias</h3>
        <ul className="overflow-y-auto pb-2">
          {articles.slice(3, 15).map((article) => (
            <Link
              href={`/artigos/${article.slug}`}
              key={article.id || article.slug}
              className="flex flex-col border-b py-3 font-bold"
            >
              <span className="text-heading text-xs">{formatDateShort(article.publishedAt)}</span>
              {article.title}
            </Link>
          ))}
        </ul>
      </div>
      <Button className="text-gray-900">Ver mais</Button>
    </div>
  );
}
