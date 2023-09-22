import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../events/event-name.enums';
import { ProductsService } from '../app/products/products.service';
import { Product } from '../app/products/entities/product.entity';
import { IProductStatus } from '../app/products/interfaces/products.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserListener {
  constructor(private productService: ProductsService) {}

  @OnEvent(Events.userCreate)
  create(payload: any) {
    // const product: Product = {
    //   _userId: payload.data._id,
    //   name: 'Produto',
    //   amount: 1200,
    //   status: IProductStatus.pending,
    // };

    // this.productService.create(product);

    console.log('event:', Events.userCreate, 'payload:', payload);
  }

  @OnEvent(Events.userCreate)
  sendEmail(payload: any) {
    console.log('event:', Events.userCreate, 'payload:', payload);
  }

  @OnEvent(Events.userUpdate)
  update(payload: any) {
    console.log('event:', Events.userUpdate, 'payload:', payload);
  }
}
