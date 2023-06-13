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

export interface IPaginateResult {
  results: any[];
  paginate: IPaginateData;
  sort: ISortData;
}

// enums

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
