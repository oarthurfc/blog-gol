import { StrapiImage, StrapiData } from '@/types';
import { Category } from './category';

export interface Article {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: {
    data: StrapiData<StrapiImage>;
  };
  category?: {
    data: StrapiData<Category>;
  };
  author?: {
    data: StrapiData<{
      name: string;
      email?: string;
      avatar?: {
        data: StrapiData<StrapiImage>;
      };
    }>;
  };
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaImage?: {
      data: StrapiData<StrapiImage>;
    };
    keywords?: string;
    canonicalURL?: string;
  };
  relatedArticles?: {
    articles: {
      data: StrapiData<Article>[];
    };
  };
}
