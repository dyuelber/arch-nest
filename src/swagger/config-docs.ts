import { DocumentBuilder } from '@nestjs/swagger';
import { ProductsModule } from '../app/products/products.module';
import { UsersModule } from '../app/users/users.module';

const configDocs = new DocumentBuilder()
  .setTitle('Docs example')
  .setDescription('API description')
  .addSecurity('auth', {
    type: 'apiKey',
    name: 'Authorization',
    in: 'header',
  })
  .setVersion('1.0')
  .build();

const modules = [UsersModule, ProductsModule];

export { configDocs, modules };
