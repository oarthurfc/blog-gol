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
