/**
 * Formata uma data para o formato desejado
 * @param dateString - String da data no formato ISO
 * @param locale - Localidade para formatação (padrão: pt-BR)
 * @returns Data formatada
 */
export function formatDate(
  dateString: string, 
  locale: string = 'pt-BR'
): string {
  const date = new Date(dateString);
  
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Obtém o tempo de leitura estimado de um conteúdo
 * @param content - Conteúdo a ser analisado
 * @param wordsPerMinute - Palavras por minuto (padrão: 200)
 * @returns Tempo de leitura em minutos
 */
export function getReadingTime(content: string, wordsPerMinute: number = 200): number {
  const text = content.replace(/<[^>]*>/g, ''); // Remove tags HTML
  const words = text.split(/\s+/).filter(Boolean).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time > 0 ? time : 1; // Mínimo 1 minuto
}
