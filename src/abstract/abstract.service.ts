import { ClientSession, Model, ObjectId } from 'mongoose';
import { AbstractInterface } from './abstract.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Abstract } from './abstract.schema';

export abstract class AbstractService implements AbstractInterface {
  protected model: Model<any>;
  protected session: ClientSession;

  constructor(@InjectModel(Abstract.name) model: any) {
    this.model = model;
  }

  async begin() {
    this.session = await this.model.db.startSession();
    this.session.startTransaction();
  }

  async commit() {
    await this.session.commitTransaction();
    this.session.endSession();
  }

  async rollback() {
    await this.session.abortTransaction();
    this.session.endSession();
  }

  find(filter: any): any {
    return this.model.find({ filters: filter });
  }

  findById(id: string | ObjectId): any {
    return this.model.findById(id);
  }

  beforeCreate(params: any): any {
    return params;
  }

  create(params: any): any {
    this.beforeCreate(params);
    const response = this.model.create(params, { session: this.session });
    return this.afterCreate(response);
  }

  afterCreate(params: any): any {
    return params;
  }

  beforeUpdate(id: string | ObjectId, params: any): any {
    return params;
  }

  update(id: string | ObjectId, params: any): any {
    this.beforeUpdate(id, params);
    const response = this.model
      .updateOne({ _id: id }, params)
      .session(this.session);
    return this.afterUpdate(id, response);
  }

  afterUpdate(id: string | ObjectId, params: any): any {
    return params;
  }

  delete(id: string | ObjectId): any {
    this.model.deleteOne({ _id: id }).session(this.session);
    return this.afterDelete();
  }

  afterDelete(): any {
    return;
  }
}
