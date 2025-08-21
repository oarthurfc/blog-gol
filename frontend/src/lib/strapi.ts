import qs from 'qs';

/**
 * URL base da API do Strapi
 */
export const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * URL das mídias do Strapi
 */
export const STRAPI_MEDIA_URL = `${API_URL}`;

/**
 * Cliente para fazer requisições à API do Strapi
 * @param endpoint - Endpoint da API
 * @param params - Parâmetros da query
 * @param options - Opções do fetch
 * @returns Promise com a resposta convertida em JSON
 */
export async function fetchAPI(
  endpoint: string,
  params?: Record<string, any>,
  options?: RequestInit
) {
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Constrói a URL da requisição com os parâmetros da query
  const queryString = params ? `?${qs.stringify(params)}` : '';
  const requestUrl = `${API_URL}${endpoint}${queryString}`;

  try {
    const response = await fetch(requestUrl, mergedOptions);
    
    if (!response.ok) {
      console.error(`Erro na API (${response.status}):`, await response.text());
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar da API:', error);
    throw error;
  }
}

/**
 * Obtém a URL completa para uma imagem do Strapi
 * @param path - Caminho da imagem
 * @returns URL completa da imagem
 */
export function getStrapiMedia(path: string | null): string {
  if (!path) return '/placeholder.png'; // Imagem padrão caso o caminho seja nulo
  
  // Se o caminho já começar com http, retorna o caminho original
  if (path.startsWith('http') || path.startsWith('//')) {
    return path;
  }
  
  // Remove a barra inicial se existir
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${STRAPI_MEDIA_URL}${normalizedPath}`;
}
