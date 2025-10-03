import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlockRendererClient from "@/components/BlockRenderClient";
import { getArticleBySlug } from "@/services/articles";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { formatDate } from "@/lib/helpers";
import { Badge } from "@/components/ui/badge";
import { Square } from "lucide-react";
import { Category } from "@/types/category";
import UltimasNoticias from "@/components/UltimasNoticias";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const artigo = await getArticleBySlug(slug);
  console.log(artigo);

  if (!artigo) {
    notFound();
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
          <span className="font-medium"> Título do Artigo</span>
        </div>
        <div className="flex gap-5">
          {/* Article content */}
          <div className="flex w-3/4 flex-col rounded-lg bg-card px-14 py-12">
            {/* Título e metadados */}
            <div className="mb-8 flex items-center text-sm text-gray-600">
              {categories && categories.length > 0 && (
                <div className="flex gap-2">
                  {categories.map((categoria, index) => (
                    <Link
                      key={categoria.id}
                      className="flex flex-row items-center gap-2"
                      href={`/categorias/${categoria.slug}`}
                    >
                      <Badge className="text-background">{categoria.name}</Badge>
                      {index < categories.length - 1 && <Square width={20} height={2} />}
                    </Link>
                  ))}
                </div>
              )}
              <span className="pl-2">{formatDate(artigo.publishedAt)}</span>
            </div>

            <BlockRendererClient content={content} />
            <p>Autor: {artigo.author?.name}</p>

            {/* Artigos relacionados */}
            <div className="mt-12">
              <h2 className="mb-4 text-2xl font-semibold">Artigos Relacionados</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* ArticleCard components irão aqui */}
              </div>
            </div>
          </div>

          <UltimasNoticias />
        </div>
      </div>
    </article>
  );
}
