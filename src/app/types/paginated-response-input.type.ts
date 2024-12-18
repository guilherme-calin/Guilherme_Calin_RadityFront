export type PaginatedResponseInput<T> = {
  currentPage: number;
  sizePerPage: number;
  totalDataCount: number;
  dataList: T[];
};
