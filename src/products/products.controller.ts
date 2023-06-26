import { Controller } from '@nestjs/common';
import { AbstractController } from 'src/abstract/abstract.controller';
import { ProductDocument } from './entities/product.entity';
import { ProductsService } from './products.service';
import { createProduct } from './validations/create';

@Controller('products')
export class ProductsController extends AbstractController<ProductDocument> {
  constructor(protected service: ProductsService) {
    super(service);
    this.createValidation = createProduct;
    this.updateValidation = createProduct;
  }
}
