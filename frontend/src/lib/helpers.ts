/**
 * Formata uma data para o formato desejado com timezone consistente
 * @param dateString - String da data no formato ISO
 * @param locale - Localidade para formatação (padrão: pt-BR)
 * @param options - Opções de formatação
 * @returns Data formatada
 */
export function formatDate(
  dateString: string,
  locale: string = "pt-BR",
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
): string {
  try {
    const date = new Date(dateString);

    // Use timezone explícito para evitar diferenças entre servidor e cliente
    return new Intl.DateTimeFormat(locale, {
      ...options,
      timeZone: "America/Sao_Paulo", // Timezone fixo para consistência
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

/**
 * Formata data para exibição curta (dia e mês)
 */
export function formatDateShort(dateString: string): string {
  return formatDate(dateString, "pt-BR", {
    day: "numeric",
    month: "short",
  });
}

/**
 * Formata data para exibição completa (dia, mês e ano)
 */
export function formatDateFull(dateString: string): string {
  return formatDate(dateString, "pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Obtém o tempo de leitura estimado de um conteúdo
 * @param content - Conteúdo a ser analisado
 * @param wordsPerMinute - Palavras por minuto (padrão: 200)
 * @returns Tempo de leitura em minutos
 */
export function getReadingTime(content: string, wordsPerMinute: number = 200): number {
  const text = content.replace(/<[^>]*>/g, ""); // Remove tags HTML
  const words = text.split(/\s+/).filter(Boolean).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time > 0 ? time : 1; // Mínimo 1 minuto
}
