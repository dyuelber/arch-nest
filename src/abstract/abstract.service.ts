/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientSession, Model, Types } from 'mongoose';
import { AbstractInterface, IAbstractFilters } from './abstract.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  IPaginateData,
  IPaginateResult,
  ISortData,
  SortOrder,
} from '../utils/interfaces.util';

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
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException();
  }

  defaultPaginate(filters: IAbstractFilters): IAbstractFilters {
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

  createPipeline(filters: IAbstractFilters) {
    return [];
  }

  async find(filters: IAbstractFilters): Promise<IPaginateResult<T>> {
    const options = this.defaultPaginate(filters);
    const pipeline = this.createPipeline(filters);

    return await this.paginate(pipeline, options.paginate, options.sort);
  }

  async paginate(
    pipeline: any[],
    paginate: IPaginateData,
    sort: ISortData,
  ): Promise<IPaginateResult<T>> {
    const results = await this.model
      .aggregate(
        pipeline
          .concat(
            sort.field
              ? [
                  {
                    $sort: {
                      [sort.field]: sort.order === SortOrder.DESC ? -1 : 1,
                    },
                  },
                ]
              : [],
          )
          .concat([
            { $skip: (paginate.page - 1) * paginate.perPage },
            { $limit: paginate.perPage },
          ]),
      )
      .collation({ locale: 'pt' });

    const [countQuery] = await this.model.aggregate(
      pipeline.concat([{ $count: 'total' }]),
    );
    const total = countQuery ? countQuery.total : 0;
    paginate.pages = Math.max(Math.ceil(total / paginate.perPage), 1);
    paginate.total = total;

    return {
      results,
      paginate,
      sort,
    };
  }

  async aggregate(aggregate: []) {
    return await this.model.aggregate(aggregate);
  }

  async findById(id: string): Promise<T> {
    this.validateObjectId(id);

    const response = (await this.model.findById(id)) as T;
    if (!response) throw new NotFoundException('Resource not found in system');

    return response;
  }

  async beforeCreate(params: T): Promise<any> {
    return params;
  }

  async create(params: T, session?: ClientSession): Promise<T> {
    params = await this.beforeCreate(params);
    const [response] = await this.model.create([params], { session });
    return await this.afterCreate(response);
  }

  async afterCreate(params: T): Promise<T> {
    return params;
  }

  async beforeUpdate(id: string, params: T): Promise<any> {
    return params;
  }

  async update(id: string, params: T, session?: ClientSession): Promise<T> {
    this.validateObjectId(id);

    params = await this.beforeUpdate(id, params);
    const response = await this.model.findOneAndUpdate({ _id: id }, params, {
      new: true,
      session: session,
    });
    if (!response) throw new BadRequestException('Resource not exists');

    return await this.afterUpdate(id, response);
  }

  async afterUpdate(id: string, params: T): Promise<T> {
    return params;
  }

  async delete(id: string, session?: ClientSession): Promise<T> {
    this.validateObjectId(id);

    const response = await this.model.findOneAndDelete({ _id: id });
    if (!response) throw new BadRequestException('Resource not exists');

    return this.afterDelete(id, response);
  }

  async afterDelete(id: string, params: T): Promise<T> {
    return params;
  }
}
