import { Footer } from "@/types/footer";

export async function getFooterData(): Promise<Footer | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/global?populate[footer][populate]=*`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`Falha ao carregar dados do footer: ${res.status}`);
    }

    const data = await res.json();
    return data?.data?.attributes?.footer || null;
  } catch (error) {
    console.error("Erro ao buscar dados do footer:", error);
    return null;
  }
}
