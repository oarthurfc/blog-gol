import { StrapiImage, StrapiData } from "@/types";
import { Category } from "./category";
import { SEO } from "./seo";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Author } from "./author";

export interface Article {
  id: number;
  flex?: "row" | "column";
  title: string;
  description?: string;
  slug: string;
  content: BlocksContent;
  image?: StrapiImage;
  categories?: Category[];
  publishedAt: string;
  seo?: SEO;
  author?: Author;
  relatedArticles?: {
    articles: {
      data: StrapiData<Article>[];
    };
  };
}

export interface ArticlePage {
  id: number;
  documentId: string;
  side_banner: {
    id: number;
    documentId: string;
    title: string;
    link: string;
    position: string;
    image?: {
      url: string;
      alternativeText?: string;
    };
  };
}
