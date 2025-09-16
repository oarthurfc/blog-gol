import { StrapiImage } from "@/types";
import { Article } from "./article";
import { SEO } from "./seo";

export interface Banner {
  id: number;
  title?: string;
  description?: string;
  image: StrapiImage;
  link?: string;
  buttonText?: string;
}

export interface HomePageData {
  id: number;
  main_article: Article;
  bet_main_article: Article;
  top_banner: Banner;
  middle_banner: Banner;
  seo?: SEO;
}
