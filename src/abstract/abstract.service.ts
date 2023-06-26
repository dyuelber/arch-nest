/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientSession, Model, Types } from 'mongoose';
import { AbstractInterface, IAbstractFilters } from './abstract.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Paginate } from '../utils/paginate.util';
import { IPaginateResult, SortOrder } from '../utils/interfaces.util';

export abstract class AbstractService<T> implements AbstractInterface {
  private perPage = 10;
  private page = 1;

  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  getModel(): Model<T> {
    return this.model;
  }

  validateObjectId(id: string): void {
    if (!Types.ObjectId.isValid(id as string)) throw new BadRequestException();
  }

  handleDefaultPaginate(filters: IAbstractFilters): IAbstractFilters {
    return {
      paginate: {
        perPage: filters.perPage ? parseInt(filters.perPage) : this.perPage,
        page: filters.page ? parseInt(filters.page) : this.page,
      },
      sort: {
        field: '_id',
        order: SortOrder.DESC,
      },
    } as IAbstractFilters;
  }

  handleAgregate(filters: IAbstractFilters) {
    return [];
  }

  async find(filters: IAbstractFilters): Promise<IPaginateResult> {
    const options = this.handleDefaultPaginate(filters);
    const aggregate = this.handleAgregate(filters);

    const response = await Paginate(
      this.model,
      aggregate,
      options.paginate,
      options.sort,
    );

    return response;
  }

  async findById(id: string): Promise<T> {
    this.validateObjectId(id);

    const response = (await this.model.findById(id)) as T;
    if (!response) throw new NotFoundException('Resource not found in system');

    return response;
  }

  async beforeCreate(params: any): Promise<any> {
    return params;
  }

  async create(params: any, session?: ClientSession): Promise<T> {
    params = await this.beforeCreate(params);
    const model = new this.model(params);
    const response = await model.save({ session });
    return await this.afterCreate(response);
  }

  async afterCreate(params: any): Promise<T> {
    return params;
  }

  async beforeUpdate(id: string, params: any): Promise<any> {
    return params;
  }

  async update(id: string, params: any, session?: ClientSession): Promise<T> {
    this.validateObjectId(id);

    params = await this.beforeUpdate(id, params);
    const response = await this.model.findOneAndUpdate({ _id: id }, params, {
      new: true,
    });
    if (!response) throw new BadRequestException('Resource not exists');

    return await this.afterUpdate(id, response);
  }

  async afterUpdate(id: string, params: any): Promise<T> {
    return params;
  }

  async delete(id: string, session?: ClientSession): Promise<T> {
    this.validateObjectId(id);

    const response = await this.model.findOneAndDelete({ _id: id });
    if (!response) throw new BadRequestException('Resource not exists');

    return this.afterDelete(id, response);
  }

  async afterDelete(id: string, params: any): Promise<T> {
    return params;
  }
}
