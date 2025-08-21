export interface Category {
  name: string;
  slug: string;
  description?: string;
  articles?: {
    data: any[];
  };
  createdAt: string;
  updatedAt: string;
}
