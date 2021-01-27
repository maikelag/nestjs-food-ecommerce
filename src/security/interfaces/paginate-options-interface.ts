export interface PaginateOptions {
  page: number;
  perPage: number;
  order: -1 | 1 | 'DESC' | 'ASC';
  relations: string;
}
