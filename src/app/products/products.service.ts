import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '../../abstract/abstract.service';
import { Product } from './entities/product.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class ProductsService extends AbstractService<Product> {
  constructor(
    @InjectModel(Product.name) protected model: Model<Product>,
    @Inject(REQUEST) protected request: Request,
  ) {
    super(model);
  }

  async beforeCreate(params: any): Promise<any> {
    params._userId = this.request.headers._id;

    return params;
  }
}
