import { Controller, Get, Param } from '@nestjs/common';
import { AbstractService } from './abstract.service';
import { ObjectId } from 'mongoose';

@Controller()
export class AbstractController {
  constructor(protected service: AbstractService) {}

  @Get()
  async find(@Param('filters') filters: string) {
    return this.service.find(filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string | ObjectId) {
    return this.service.findById(id);
  }
}
