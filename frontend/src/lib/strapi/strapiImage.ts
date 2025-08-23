export function strapiImage(url: string): string {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';
  if (url.startsWith('http')) return url;
  return `${baseURL}${url}`;
}
