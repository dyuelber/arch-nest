import { Model, ObjectId } from 'mongoose';
import { AbstractInterface } from './abstract.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Abstract } from './abstract.schema';

export abstract class AbstractService implements AbstractInterface {
  protected model: Model<any>;

  constructor(@InjectModel(Abstract.name) model: any) {
    this.model = model;
  }

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
