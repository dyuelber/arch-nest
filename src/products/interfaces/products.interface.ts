import { ObjectId } from 'mongoose';

export interface IProducts {
  _userId: ObjectId;
  name?: string;
  amount?: string;
  status?: IProductStatus;
}

export enum IProductStatus {
  disabled = 'disabled',
  active = 'active',
  pending = 'pending',
}
