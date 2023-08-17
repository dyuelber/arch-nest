import { Controller } from '@nestjs/common';
import { AbstractController } from '../../abstract/abstract.controller';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { create, update } from './validations/create-update';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class ProductsController extends AbstractController<Product> {
  constructor(protected service: ProductsService) {
    super(service);
    this.createValidation = create;
    this.updateValidation = update;
  }
}
