import { ClientSession } from 'mongoose';
import { IPaginateData, ISortData } from '../utils/interfaces.util';

export interface AbstractInterface {
  find(filter: any): any;
  findById(id: string): any;
  create(params: any, session?: ClientSession): any;
  update(id: string, params: any, session?: ClientSession): any;
  delete(id: string, session?: ClientSession): any;
}

export interface IAbstractFilters {
  search: string;
  page?: string;
  perPage?: string;
  paginate?: IPaginateData;
  sort?: ISortData;
}
