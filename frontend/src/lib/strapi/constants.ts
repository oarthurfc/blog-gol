/**
 * Constantes e helpers para consultas do Strapi
 */

// Campos mínimos para imagens (quando não precisa de todos os dados)
export const IMAGE_FIELDS_MINIMAL = ["url", "alternativeText", "width", "height"] as const;

// Campos padrão para imagens do Strapi
export const IMAGE_FIELDS = [
  "id",
  "name",
  "alternativeText",
  "caption",
  "url",
  "width",
  "height",
  "provider",
] as const;

// Campos essenciais para SEO
export const SEO_FIELDS = [
  "metaTitle",
  "metaDescription",
  "keywords",
  "canonicalURL",
  "metaImage",
  "openGraph",
] as const;

// Helper para populate de imagem completa
export const populateImage = () => ({
  fields: IMAGE_FIELDS,
});

// Helper para populate de imagem mínima
export const populateImageMinimal = () => ({
  fields: IMAGE_FIELDS_MINIMAL,
});

// Helper para populate de SEO completo
export const populateSEO = () => ({
  populate: {
    openGraph: {
      populate: {
        ogImage: {
          fields: IMAGE_FIELDS,
        },
      },
    },
    metaImage: {
      fields: IMAGE_FIELDS,
    },
  },
});

// Helper para populate de categoria básica
export const populateCategory = () => ({
  fields: ["name", "slug"],
});
