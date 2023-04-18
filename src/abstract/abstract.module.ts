import { AbstractController } from './abstract.controller';
import { AbstractService } from './abstract.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AbstractController],
  providers: [AbstractService],
})
export class AbstractModule {}
