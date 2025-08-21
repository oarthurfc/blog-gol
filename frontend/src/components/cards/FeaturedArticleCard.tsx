import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FeaturedArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
  category?: {
    name: string;
    slug: string;
  };
  publishedAt: string;
}

export default function FeaturedArticleCard({
  title,
  excerpt,
  slug,
  coverImage,
  category,
  publishedAt
}: FeaturedArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden md:flex">
      {/* Imagem do artigo (maior para artigos destacados) */}
      {coverImage && (
        <div className="relative h-64 md:h-auto md:w-2/5">
          <Image
            src={coverImage || 'https://via.placeholder.com/800x600'}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6 md:w-3/5">
        {/* Tag de destaque */}
        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mb-2 mr-2">
          Em Destaque
        </span>
        
        {/* Categoria */}
        {category && (
          <Link 
            href={`/categories/${category.slug}`}
            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2"
          >
            {category.name}
          </Link>
        )}
        
        {/* Título */}
        <Link href={`/articles/${slug}`}>
          <h2 className="text-2xl font-bold mb-3 hover:text-blue-600">{title}</h2>
        </Link>
        
        {/* Resumo */}
        <p className="text-gray-600 mb-4">{excerpt}</p>
        
        {/* Metadados */}
        <div className="text-sm text-gray-500 mb-4">
          {new Date(publishedAt).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
        
        {/* Link "Ler mais" mais destacado */}
        <Link 
          href={`/articles/${slug}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          Ler artigo completo
        </Link>
      </div>
    </div>
  );
}
