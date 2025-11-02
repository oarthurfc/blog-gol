import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Bet } from "./bet";
import { Category } from "./category";
import { Faq } from "./faq";
import { Testimonial } from "./testimonial";

export interface ApostasPageData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content_1: BlocksContent;
  content_2: BlocksContent;
  bets: Bet[];
  testimonials: Testimonial[];
  faqs: Faq[];
  categories: Category[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
