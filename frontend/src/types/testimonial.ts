import { StrapiImage } from ".";

export interface Testimonial {
  id: number;
  name: string;
  profilePicture?: StrapiImage;
  content: string;
  jobTitle: string;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
