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

export interface StrapiSingleResponse<T> {
  data: StrapiData<T>;
  meta?: Record<string, unknown>;
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

// Union type para responses que podem ser arrays ou single items
export type StrapiApiResponse<T> = StrapiResponse<T> | StrapiSingleResponse<T>;

// Helper type para parâmetros de populate
export type PopulateParams = Record<string, unknown>;

// Interface para parâmetros de filtros
export type FilterParams = Record<string, unknown>;

// Interface para parâmetros de paginação
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  limit?: number;
  start?: number;
}

// Interface completa para parâmetros do Strapi
export interface StrapiQueryParams {
  populate?: PopulateParams;
  filters?: FilterParams;
  pagination?: PaginationParams;
  sort?: string[];
  status?: string;
  [key: string]: unknown;
}
