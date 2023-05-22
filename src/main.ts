import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { configDocs, modules } from './swagger/config-docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, configDocs, {
    include: modules,
  });
  SwaggerModule.setup(process.env.ROUTE_DOCS, app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
