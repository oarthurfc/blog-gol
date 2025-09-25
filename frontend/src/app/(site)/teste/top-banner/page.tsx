import { getArticleBySlug } from "@/services/articles";
import { getGlobalData } from "@/services/global";
import { getHomepageTopBanner } from "@/services/homepage-top-banner";

export default async function Home() {
  const home = await getHomepageTopBanner();
  const article = await getArticleBySlug("artigo-teste");
  const global = await getGlobalData();

  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1320px] flex-col items-center py-10 sm:items-start">
      <h1>Página de Teste Top Banner</h1>
      <pre>{JSON.stringify(home, null, 2)}</pre>
      <pre>{JSON.stringify(article, null, 2)}</pre>
      <pre>{JSON.stringify(global, null, 2)}</pre>
      <p>00:56</p>
    </div>
  );
}
