import { MongooseModule } from '@nestjs/mongoose';
import { AbstractController } from './abstract.controller';
import { AbstractService } from './abstract.service';
import { Module } from '@nestjs/common';
import { Abstract, AbstractSchema } from './abstract.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Abstract.name, schema: AbstractSchema },
    ]),
  ],
  controllers: [AbstractController],
  providers: [AbstractService],
})
export class AbstractModule {}
