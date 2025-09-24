import { generateMetadataObject } from "@/lib/metadata";
import { getHomepage } from "@/services/homepage-middle-banner";

export default async function Home() {
  const home = await getHomepage();

  generateMetadataObject(home?.seo);

  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1320px] flex-col items-center py-10 sm:items-start">
      <h1>Página de Teste Middle Banner</h1>
      <pre>{JSON.stringify(home, null, 2)}</pre>
    </div>
  );
}
