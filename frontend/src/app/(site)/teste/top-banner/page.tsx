import { getHomepageTopBanner } from "@/services/homepage-top-banner";

export default async function Home() {
  const home = await getHomepageTopBanner();

  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1320px] flex-col items-center py-10 sm:items-start">
      <h1>Página de Teste Top Banner</h1>
      <pre>{JSON.stringify(home, null, 2)}</pre>
    </div>
  );
}
