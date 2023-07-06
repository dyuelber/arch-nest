export interface IPaginateData {
  page: number;
  perPage: number;
  pages?: number;
  total?: number;
}

export interface ISortData {
  field?: string;
  order?: SortOrder;
}

export interface IPaginateResult<T> {
  results: T[];
  paginate: IPaginateData;
  sort: ISortData;
}

// enums

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
