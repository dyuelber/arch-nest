import { ClientSession, Model, ObjectId } from 'mongoose';
import { AbstractInterface } from './abstract.interface';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractService<T> implements AbstractInterface {
  protected model: Model<T>;
  protected session: ClientSession;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async begin() {
    this.session = await this.model.db.startSession();
    this.session.startTransaction();
  }

  async commit() {
    await this.session.commitTransaction();
    await this.session.endSession();
  }

  async rollback() {
    await this.session.abortTransaction();
    await this.session.endSession();
  }

  async find(filters: any): Promise<T[]> {
    console.log('🚀 ~ AbstractService<T> ~ find ~ filters:', filters);
    const response = (await this.model.find({
      filter: filters,
    })) as unknown as T[];

    if (!response.length)
      throw new NotFoundException('Resources not found in system');

    return response;
  }

  async findById(id: string | ObjectId): Promise<T> {
    const response = (await this.model.findById(id)) as T;
    if (!response) throw new NotFoundException('Resource not found in system');

    return response;
  }

  async beforeCreate(params: any): Promise<T> {
    return params;
  }

  async create(params: any): Promise<T> {
    params = await this.beforeCreate(params);
    const response = await this.model.create(params);
    return await this.afterCreate(response);
  }

  async afterCreate(params: any): Promise<T> {
    return params;
  }

  async beforeUpdate(id: string | ObjectId, params: any): Promise<T> {
    return params;
  }

  async update(id: string | ObjectId, params: any): Promise<T> {
    params = await this.beforeUpdate(id, params);
    const response = await this.model.findOneAndUpdate({ _id: id }, params, {
      new: true,
    });
    return await this.afterUpdate(id, response);
  }

  async afterUpdate(id: string | ObjectId, params: any): Promise<T> {
    return params;
  }

  async delete(id: string | ObjectId): Promise<T> {
    const response = await this.model.findOneAndDelete({ _id: id });
    return this.afterDelete(id, response);
  }

  async afterDelete(id: string | ObjectId, params: any): Promise<T> {
    return params;
  }
}
