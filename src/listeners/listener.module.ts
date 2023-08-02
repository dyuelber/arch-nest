import { Module } from '@nestjs/common';
import { UserListener } from './user.listener';
import { ProductsModule } from '../app/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [UserListener],
})
export class ListenerModule {}
