import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlockRendererClient from "@/components/BlockRenderClient";
import ArticleCard from "@/components/cards/ArticleCard";
import { getArticleBySlug, getRelatedArticles } from "@/services/articles";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { formatDateWithTime } from "@/lib/helpers";
import { Badge } from "@/components/ui/badge";
import { Square } from "lucide-react";
import { Category } from "@/types/category";
import { Article } from "@/types/article";
import UltimasNoticias from "@/components/UltimasNoticias";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const artigo = await getArticleBySlug(slug);

  if (!artigo) {
    notFound();
  }

  // Buscar artigos relacionados por categoria
  let relatedArticles: Article[] = [];
  if (artigo.categories && artigo.categories.length > 0) {
    const firstCategory = artigo.categories[0];
    relatedArticles = await getRelatedArticles(firstCategory.id, artigo.id?.toString() || "", 4);
  }

  const content: BlocksContent = artigo.content;
  const categories: Category[] | undefined = artigo.categories;

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-[1320px]">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          &gt;
          <Link href="/artigos" className="hover:underline">
            {" "}
            Artigos
          </Link>{" "}
          &gt;
          <span className="font-medium"> {artigo.title}</span>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {/* Article content */}
          <div className="col-span-3 flex flex-col rounded-lg bg-card px-14 py-12">
            {categories && categories.length > 0 && (
              <div className="mb-8 flex gap-2">
                {categories.map((categoria, index) => (
                  <Link
                    key={categoria.id}
                    className="flex flex-row items-center gap-2"
                    href={`/categorias/${categoria.slug}`}
                  >
                    <Badge className="text-gray-900">{categoria.name}</Badge>
                    {index < categories.length - 1 && <Square width={20} height={2} />}
                  </Link>
                ))}
              </div>
            )}

            <BlockRendererClient content={content} />
            <div className="flex justify-between border-t pt-6">
              <div className="flex flex-col">
                <p className="text-lg font-bold">{artigo.author?.name}</p>
                <span className="text-secondary-foreground">
                  {formatDateWithTime(artigo.publishedAt)}
                </span>
              </div>
              <div>
                <p>compartilhar</p>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <UltimasNoticias />
          </div>
        </div>

        {/* Artigos relacionados */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-heading mb-6 text-3xl font-bold">Artigos Relacionados</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedArticles.map((article) => (
                <ArticleCard key={article.id || article.slug} {...article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
