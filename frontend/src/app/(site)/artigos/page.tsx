import { getArticles } from "@/services/articles";
import ArticleCard from "@/components/cards/ArticleCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface ArticlesPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 12;

  const articles = await getArticles(currentPage, pageSize);

  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1320px] flex-col py-10">
      <h1 className="mb-8 text-3xl font-bold text-primary-yellow">Todos os Artigos</h1>

      {/* Lista de artigos */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article) => (
            <ArticleCard key={article.id || article.slug} {...article} />
          ))}
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center">
          <p className="text-lg text-gray-500">Nenhum artigo encontrado.</p>
        </div>
      )}

      {/* Paginação */}
      <div className="mt-12 flex items-center justify-center gap-4">
        {currentPage > 1 && (
          <Link href={`/artigos?page=${currentPage - 1}`}>
            <Button variant="outline">Página Anterior</Button>
          </Link>
        )}

        <span className="flex items-center gap-2 px-4 py-2 text-sm">
          Página <span className="font-bold text-primary-yellow">{currentPage}</span>
        </span>

        {articles.length === pageSize && (
          <Link href={`/artigos?page=${currentPage + 1}`}>
            <Button variant="outline">Próxima Página</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
