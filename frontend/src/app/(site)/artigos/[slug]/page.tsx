import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BlockRendererClient from "@/components/BlockRenderClient";
import { getArticleBySlug } from "@/services/articles";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { formatDate } from "@/lib/helpers";
import { Badge } from "@/components/ui/badge";
import { Square } from "lucide-react";
import { Category } from "@/types/category";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;

  const artigo = await getArticleBySlug(slug);
  console.log("ARTIGO", artigo);

  const content: BlocksContent = artigo.content;
  console.log("CONTENT", content);
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
            {/* Imagem destacada */}
            <div className="mb-8">
              <Image
                src="https://placehold.co/600x400"
                alt="Título do artigo"
                width={800}
                height={400}
                className="h-auto w-full rounded-lg"
              />
            </div>

            {/* Conteúdo do artigo */}
            <div className="prose max-w-none">
              {/* O conteúdo do artigo será renderizado aqui */}
              <p>Conteúdo do artigo...</p>
            </div>

            {/* Artigos relacionados */}
            <div className="mt-12">
              <h2 className="mb-4 text-2xl font-semibold">Artigos Relacionados</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* ArticleCard components irão aqui */}
              </div>
            </div>
          </div>

          {/* Últimas notícias */}
          <div className="flex w-1/4 flex-1 flex-col gap-4 rounded-sm bg-card px-4 py-5">
            <h3 className="text-2xl font-bold text-primary-yellow">Últimas notícias</h3>
            <ul className="pb-2">
              {Array.from({ length: 7 }).map((_, index) => (
                <li key={index + 1} className="flex flex-col border-b py-3 font-bold">
                  <span className="text-xs text-primary-yellow">há 58 minutos</span>
                  última notícia
                </li>
              ))}
            </ul>
            <Button>Ver mais</Button>
          </div>
        </div>
      </div>
    </article>
  );
}
