import { getHomepage } from "@/services/homepage";
import React from "react";

export default async function ArticlesPage() {
  const home = await getHomepage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Todos os Artigos</h1>

      <p>Título do artigo principal:</p>
      <p>{home?.main_article?.title}</p>

      {/* Filtros (opcional) */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">{/* Categorias filtráveis irão aqui */}</div>
      </div>

      {/* Lista de artigos */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* ArticleCard components irão aqui */}
      </div>

      {/* Paginação */}
      <div className="mt-8 flex justify-center">{/* Componente de paginação aqui */}</div>
    </div>
  );
}
