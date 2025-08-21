import React from 'react';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Categoria: {slug}</h1>
      
      {/* Lista de artigos da categoria */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ArticleCard components irão aqui */}
      </div>
      
      {/* Paginação */}
      <div className="mt-8 flex justify-center">
        {/* Componente de paginação aqui */}
      </div>
    </div>
  );
}
