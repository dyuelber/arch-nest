import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { AbstractInterface } from './abstract.interface';

@Injectable()
export class AbstractService implements AbstractInterface {
  protected model: Model<any>;

  find(filter: any): any {
    return this.model.find({ filters: filter });
  }

  findById(id: string | ObjectId): any {
    return this.model.findById(id);
  }

  create(params: any): any {
    return this.model.create(params);
  }

  update(id: string | ObjectId, params: any): any {
    return this.model.updateOne({ _id: id }, params);
  }

  delete(id: string | ObjectId): any {
    return this.model.deleteOne({ _id: id });
  }
}
