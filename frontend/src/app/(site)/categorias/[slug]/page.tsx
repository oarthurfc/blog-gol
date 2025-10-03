import React from "react";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Categoria: {slug}</h1>

      {/* Lista de artigos da categoria */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* ArticleCard components irão aqui */}
      </div>

      {/* Paginação */}
      <div className="mt-8 flex justify-center">{/* Componente de paginação aqui */}</div>
    </div>
  );
}
