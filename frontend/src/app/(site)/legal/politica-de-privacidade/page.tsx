import BlockRendererClient from "@/components/BlockRenderClient";
import { getPoliticaDePrivacidade } from "@/services/legal";
import { notFound } from "next/navigation";

export const revalidate = 5;

export default async function PoliticaDePrivacidade() {
  const politica = await getPoliticaDePrivacidade();
  console.log("politica", politica);

  if (!politica || !politica.data || !politica.data.content) {
    notFound();
  }

  return (
    <div className="container mx-auto my-12 max-w-[1320xp] flex-col rounded-lg bg-card px-14 py-12">
      <BlockRendererClient content={politica.data.content} />
    </div>
  );
}
