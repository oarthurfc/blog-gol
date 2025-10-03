import React from "react";
import ArticleCard from "@/components/cards/ArticleCard";
import { Button } from "@/components/ui/button";
import { getArticlesByCategory } from "@/services/articles";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: {
    page?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 12;

  const articles = await getArticlesByCategory(slug, currentPage, pageSize);

  // Capitalize first letter for display
  const categoryDisplayName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1320px] flex-col py-10">
      <h1 className="mb-8 text-3xl font-bold text-primary-yellow">
        Categoria: {categoryDisplayName}
      </h1>

      {/* Lista de artigos da categoria */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article) => (
            <ArticleCard key={article.id || article.slug} {...article} />
          ))}
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center">
          <p className="text-lg text-gray-500">Nenhum artigo encontrado nesta categoria.</p>
        </div>
      )}

      {/* Paginação */}
      <div className="mt-12 flex items-center justify-center gap-4">
        {currentPage > 1 && (
          <Link href={`/categorias/${slug}?page=${currentPage - 1}`}>
            <Button variant="outline">Página Anterior</Button>
          </Link>
        )}

        <span className="flex items-center gap-2 px-4 py-2 text-sm">
          Página <span className="font-bold text-primary-yellow">{currentPage}</span>
        </span>

        {articles.length === pageSize && (
          <Link href={`/categorias/${slug}?page=${currentPage + 1}`}>
            <Button variant="outline">Próxima Página</Button>
          </Link>
        )}
      </div>

      {/* Link para voltar */}
      <div className="mt-8 flex justify-center">
        <Link href="/artigos">
          <Button variant="outline">← Voltar para Todos os Artigos</Button>
        </Link>
      </div>
    </div>
  );
}
