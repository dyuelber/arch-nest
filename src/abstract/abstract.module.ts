import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Abstract, AbstractSchema } from './abstract.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Abstract.name, schema: AbstractSchema },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AbstractModule {}
