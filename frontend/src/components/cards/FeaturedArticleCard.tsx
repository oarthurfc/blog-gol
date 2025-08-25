import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { strapiImage } from "@/lib/strapi/strapiImage";

interface FeaturedArticleCardProps {
  id: number;
  title: string;
  description: string;
  slug: string;
  image?: {
    id: number;
    name: string;
    alternativeText?: string | null;
    caption?: string | null;
    url: string;
  };
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  content?: Array<unknown>;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  dynamic_zone?: Array<unknown>;
  seo?: unknown;
}

export default function FeaturedArticleCard({
  id,
  title,
  description,
  slug,
  image,
  categories,
  publishedAt
}: FeaturedArticleCardProps) {
  return (
    <div className="flex flex-col bg-card-background rounded-lg shadow overflow-hidden text-white">
      {/* Imagem do artigo (maior para artigos destacados) */}
      {image?.url && (
        <div className="relative h-64 w-full">
          <Image
            src={strapiImage(image.url)  || 'https://via.placeholder.com/800x600'}
            alt={image.alternativeText || title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="px-6 py-16">

        {/* Categoria */}
        {categories && categories.length > 0 && (
          <Link
            href={`/categorias/${categories[0].slug}`}
            className=" bg-primary-yellow text-card-background text-xs px-2 py-1 rounded-full mb-2"
          >
            {categories[0].name}
          </Link>
        )}

        {/* Título */}
        <Link href={`/articles/${slug}`}>
          <h2 className="text-2xl font-bold mb-3 ">{title}</h2>
        </Link>

        {/* Resumo */}
        <p className=" mb-4">{description}</p>

        {/* Metadados */}
        <div className="text-sm mb-4">
          {new Date(publishedAt).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>

        {/* Link "Ler mais" mais destacado */}
        <Link
          href={`/articles/${slug}`}
          className="inline-block px-4 py-2 text-white font-medium rounded  transition"
        >
          Ler artigo completo
        </Link>
      </div>
    </div>
  );
}
