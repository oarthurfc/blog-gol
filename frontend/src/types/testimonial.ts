import { StrapiImage, StrapiData } from '@/types';

export interface Testimonial {
  name: string;
  role?: string;
  content: string;
  rating?: number;
  avatar?: {
    data: StrapiData<StrapiImage>;
  };
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}
