import { ClientSession, Model, Types } from 'mongoose';
import { AbstractInterface, IAbstractFilters } from './abstract.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export abstract class AbstractService<T> implements AbstractInterface {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  getModel(): Model<T> {
    return this.model;
  }

  handleFilters(filters: IAbstractFilters): IAbstractFilters {
    if (!filters.search) return;
    delete filters.search;
    return filters;
  }

  validateObjectId(id: string): void {
    if (!Types.ObjectId.isValid(id as string)) throw new BadRequestException();
  }

  async find(filters: IAbstractFilters): Promise<T[]> {
    const filter = this.handleFilters(filters);
    const response = (await this.model
      .find(filter)
      .sort({ _id: 1 })) as unknown as T[];

    if (!response.length)
      throw new NotFoundException('Resources not found in system');

    return response;
  }

  async findById(id: string): Promise<T> {
    this.validateObjectId(id);

    const response = (await this.model.findById(id)) as T;
    if (!response) throw new NotFoundException('Resource not found in system');

    return response;
  }

  async beforeCreate(params: any): Promise<T> {
    return params;
  }

  async create(params: any, session?: ClientSession): Promise<T> {
    params = await this.beforeCreate(params);
    const response = await this.model.create(params, { session });
    console.log('🚀 ~ AbstractService<T> ~ create ~ response:', response);

    return await this.afterCreate(response);
  }

  async afterCreate(params: any): Promise<T> {
    return params;
  }

  async beforeUpdate(id: string, params: any): Promise<T> {
    return params;
  }

  async update(id: string, params: any, session?: ClientSession): Promise<T> {
    this.validateObjectId(id);

    params = await this.beforeUpdate(id, params);
    const response = await this.model.findOneAndUpdate({ _id: id }, params, {
      new: true,
      session,
    });
    if (!response) throw new BadRequestException('Resource not exists');

    return await this.afterUpdate(id, response);
  }

  async afterUpdate(id: string, params: any): Promise<T> {
    return params;
  }

  async delete(id: string, session?: ClientSession): Promise<T> {
    this.validateObjectId(id);

    const response = await this.model.findOneAndDelete(
      { _id: id },
      { session },
    );
    if (!response) throw new BadRequestException('Resource not exists');

    return this.afterDelete(id, response);
  }

  async afterDelete(id: string, params: any): Promise<T> {
    return params;
  }
}
