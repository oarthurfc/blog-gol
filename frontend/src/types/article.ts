import { StrapiImage, StrapiData } from "@/types";
import { Category } from "./category";
import { SEO } from "./seo";
import { BlocksContent } from "@strapi/blocks-react-renderer";

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: BlocksContent;
  coverImage?: {
    data: StrapiData<StrapiImage>;
  };
  category?: {
    data: StrapiData<Category>;
  };
  publishedAt: string;
  seo?: SEO;
  relatedArticles?: {
    articles: {
      data: StrapiData<Article>[];
    };
  };
}
