import React from 'react';

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Todos os Artigos</h1>
      
      {/* Filtros (opcional) */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          {/* Categorias filtráveis irão aqui */}
        </div>
      </div>
      
      {/* Lista de artigos */}
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
