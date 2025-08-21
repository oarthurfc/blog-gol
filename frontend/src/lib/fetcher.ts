/**
 * Função genérica de fetch com tratamento de erros
 * @param url - URL a ser requisitada
 * @param options - Opções do fetch
 * @returns Promise com a resposta convertida em JSON
 */
export async function fetcher<T>(
  url: string, 
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    
    return response.json() as Promise<T>;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}
