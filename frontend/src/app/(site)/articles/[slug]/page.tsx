import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;
  
  // Aqui você irá buscar os dados do artigo com base no slug
  
  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <Link href="/articles" className="hover:underline"> Artigos</Link> &gt; 
          <span className="font-medium"> Título do Artigo</span>
        </div>
        
        {/* Título e metadados */}
        <h1 className="text-4xl font-bold mb-4">Título do Artigo: {slug}</h1>
        <div className="flex items-center mb-8 text-sm text-gray-600">
          <span>Por Autor</span>
          <span className="mx-2">•</span>
          <span>10 de Agosto, 2023</span>
          <span className="mx-2">•</span>
          <span>Categoria</span>
        </div>
        
        {/* Imagem destacada */}
        <div className="mb-8">
          <Image 
            src="https://via.placeholder.com/800x400" 
            alt="Título do artigo" 
            width={800}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </div>
        
        {/* Conteúdo do artigo */}
        <div className="prose max-w-none">
          {/* O conteúdo do artigo será renderizado aqui */}
          <p>Conteúdo do artigo...</p>
        </div>
        
        {/* Artigos relacionados */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Artigos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ArticleCard components irão aqui */}
          </div>
        </div>
      </div>
    </article>
  );
}
