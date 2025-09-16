import { getGlobalData, FooterData } from "./global";

/**
 * @deprecated Use getGlobalData().footer instead
 */
export async function getFooterData(): Promise<FooterData | null> {
  try {
    const globalData = await getGlobalData();
    return globalData?.footer || null;
  } catch (error) {
    console.error("Erro ao buscar dados do footer:", error);
    return null;
  }
}
