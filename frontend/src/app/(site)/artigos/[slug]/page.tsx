import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlockRendererClient from "@/components/BlockRenderClient";
import ArticleCard from "@/components/cards/ArticleCard";
import { getArticleBySlug, getArticlePage, getRelatedArticles } from "@/services/articles";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { formatDateWithTime } from "@/lib/helpers";
import { generateMetadataObject } from "@/lib/metadata";
import { Badge } from "@/components/ui/badge";
import { Square } from "lucide-react";
import ShareSection from "@/components/ShareSection";
import { Category } from "@/types/category";
import { Article } from "@/types/article";
import UltimasNoticias from "@/components/UltimasNoticias";
import SideBanner from "@/components/SideBanner";
import seoData from "@/lib/nextMetadata";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const artigo = await getArticleBySlug(slug);

  if (!artigo || !artigo.seo) {
    return seoData;
  }

  return generateMetadataObject(artigo.seo, artigo?.author, artigo.publishedAt);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const artigo = await getArticleBySlug(slug);
  const articlePageData = await getArticlePage();
  console.log("Artigo CONTENT", artigo?.content);

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
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          {/* Article content */}
          <div className="flex flex-col rounded-lg bg-card px-6 py-8 lg:col-span-3 lg:px-14 lg:py-12">
            {categories && categories.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {categories.map((categoria, index) => (
                  <Link
                    key={categoria.id}
                    className="flex flex-row items-center gap-2"
                    href={`/categorias/${categoria.slug}`}
                  >
                    <Badge>{categoria.name}</Badge>
                    {index < categories.length - 1 && <Square width={20} height={2} />}
                  </Link>
                ))}
              </div>
            )}

            <BlockRendererClient content={content} />
            <div className="flex flex-col justify-between gap-4 border-t pt-6 lg:flex-row">
              <div className="flex flex-col">
                {artigo.author && (
                  <p className="text-lg font-bold">
                    {artigo.author?.first_name + " " + artigo.author?.last_name}
                  </p>
                )}
                <span className="text-sm text-secondary-foreground">
                  {formatDateWithTime(artigo.publishedAt)}
                </span>
              </div>
              <ShareSection
                seo={generateMetadataObject(artigo.seo, artigo.author, artigo.publishedAt)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-1">
            <UltimasNoticias />

            {/* Banner lateral */}
            {articlePageData?.side_banner && <SideBanner banner={articlePageData.side_banner} />}
          </div>
        </div>

        {/* Artigos relacionados */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-3xl font-bold text-heading">Artigos Relacionados</h2>
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
