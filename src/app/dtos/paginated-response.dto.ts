import { PaginatedResponseInput } from '../types/paginated-response-input.type';

export class PaginatedResponseDTO<T> {
  constructor(input: PaginatedResponseInput<T>) {
    const { sizePerPage, currentPage, totalDataCount, dataList } = input;

    this.pagesAmount = Math.ceil(totalDataCount / sizePerPage);
    this.sizePerPage = sizePerPage;
    this.currentPage = currentPage;
    this.totalDataCount = totalDataCount;
    this.dataList = dataList;
  }

  pagesAmount: number;
  currentPage: number;
  sizePerPage: number;
  totalDataCount: number;
  dataList: T[];
}
