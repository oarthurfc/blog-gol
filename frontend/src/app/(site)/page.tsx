import React from 'react';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog GOL - Home</h1>
      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Artigos em Destaque</h2>
          {/* Aqui virão os componentes FeaturedArticleCard */}
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Artigos Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Aqui virão os componentes ArticleCard */}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Depoimentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aqui virão os componentes TestimonialCard */}
          </div>
        </section>
      </div>
    </main>
  );
}
