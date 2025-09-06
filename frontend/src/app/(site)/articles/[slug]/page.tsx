import React from "react";
import Link from "next/link";
import Image from "next/image";

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
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          &gt;
          <Link href="/articles" className="hover:underline">
            {" "}
            Artigos
          </Link>{" "}
          &gt;
          <span className="font-medium"> Título do Artigo</span>
        </div>

        {/* Título e metadados */}
        <h1 className="mb-4 text-4xl font-bold">Título do Artigo: {slug}</h1>
        <div className="mb-8 flex items-center text-sm text-gray-600">
          <span>Por Autor</span>
          <span className="mx-2">•</span>
          <span>10 de Agosto, 2023</span>
          <span className="mx-2">•</span>
          <span>Categoria</span>
        </div>

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
    </article>
  );
}
