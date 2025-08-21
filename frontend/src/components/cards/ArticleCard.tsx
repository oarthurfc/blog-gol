import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
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

export default function ArticleCard({
  title,
  excerpt,
  slug,
  coverImage,
  category,
  publishedAt
}: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Imagem do artigo */}
      {coverImage && (
        <div className="relative h-48 w-full">
          <Image
            src={coverImage || 'https://via.placeholder.com/400x200'}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-5">
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
          <h3 className="text-xl font-bold mb-2 hover:text-blue-600">{title}</h3>
        </Link>
        
        {/* Resumo */}
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        
        {/* Metadados */}
        <div className="text-sm text-gray-500">
          {new Date(publishedAt).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
        
        {/* Link "Ler mais" */}
        <Link 
          href={`/articles/${slug}`}
          className="inline-block mt-4 text-blue-600 hover:underline font-medium"
        >
          Ler mais
        </Link>
      </div>
    </div>
  );
}
