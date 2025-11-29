import { generateMetadataObject } from "@/lib/metadata";

export async function generateMetadata() {
  return generateMetadataObject({
    id: 1,
    metaTitle: "Campeonato Brasileiro - Gol a Gol Esportes",
    metaDescription:
      "Acompanhe as últimas notícias, análises e resultados do Campeonato Brasileiro",
  });
}

export default async function BrasileiroPage() {
  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1320px] flex-col items-center px-4 py-10 sm:items-start lg:px-0">
      {/* Campeonato Brasileiro Widget */}
      <div className="flex w-full flex-col gap-5 py-8 lg:py-14">
        <h2 className="text-2xl font-bold text-heading lg:text-3xl">Campeonato Brasileiro</h2>
        <iframe
          src="https://widget.api-futebol.com.br/render/widget_ca34984f1f3ce8fa"
          title="API Futebol - Widget"
          width="100"
          height="800"
          style={{
            border: "1px solid #E5E7EB",
            borderRadius: "0.375rem",
            background: "transparent",
            width: "100%",
            height: "800px",
          }}
          loading="lazy"
          referrerPolicy="unsafe-url"
          sandbox="allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"
        ></iframe>
      </div>
    </div>
  );
}
