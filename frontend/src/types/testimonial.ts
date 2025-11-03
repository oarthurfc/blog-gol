import { StrapiImage } from ".";

export interface Testimonial {
  id: number;
  name: string;
  profile_picture?: StrapiImage;
  content: string;
  job_title: string;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
