import BlockRendererClient from "@/components/BlockRenderClient";
import { getTermosECondicoes } from "@/services/legal";
import { notFound } from "next/navigation";

export const revalidate = 5;

export default async function TermosECondicoes() {
  const termos = await getTermosECondicoes();
  console.log("termos", termos);

  if (!termos || !termos.data || !termos.data.content) {
    notFound();
  }

  return (
    <div className="container mx-auto my-12 max-w-[1320xp] flex-col rounded-lg bg-card px-14 py-12">
      <BlockRendererClient content={termos.data.content} />
    </div>
  );
}
