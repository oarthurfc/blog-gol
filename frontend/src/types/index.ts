export interface StrapiImage {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  url: string;
  width: number;
  height: number;
  provider: string;
}

export interface StrapiResponse<T> {
  data: StrapiData<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}
