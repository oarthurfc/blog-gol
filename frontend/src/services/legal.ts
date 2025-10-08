import fetchContentType from "@/lib/strapi/fetchContentType";
import { PoliticaDePrivacidade, TermosECondicoes } from "@/types/legal";

export async function getPoliticaDePrivacidade(): Promise<PoliticaDePrivacidade | null> {
  try {
    const response = await fetchContentType("politica-de-privacidade", {});
    return response as PoliticaDePrivacidade;
  } catch (error) {
    console.error("Erro ao buscar política de privacidade:", error);
    return null;
  }
}

export async function getTermosECondicoes(): Promise<TermosECondicoes | null> {
  try {
    const response = await fetchContentType("termos-e-condicoes", {});
    return response as TermosECondicoes;
  } catch (error) {
    console.error("Erro ao buscar termos e condições:", error);
    return null;
  }
}
