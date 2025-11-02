import { StrapiImage } from ".";

export interface Bet {
  id: number;
  documentId: string;
  name: string;
  stars: number;
  logo?: StrapiImage;
  differential: string;
  checklist_1: string;
  checklist_2: string;
  checklist_3: string;
  link: string;
  ranking: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
