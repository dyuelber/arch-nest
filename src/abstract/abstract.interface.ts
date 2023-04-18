import { ObjectId } from 'mongoose';

export interface AbstractInterface {
  find(filter: any): any;
  findById(id: string | ObjectId): any;
  create(params: any): any;
  update(id: string | ObjectId, params: any): any;
  delete(id: string | ObjectId): any;
}
