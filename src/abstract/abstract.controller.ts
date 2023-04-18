import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AbstractService } from './abstract.service';
import { ObjectId } from 'mongoose';

export abstract class AbstractController {
  constructor(protected service: AbstractService) {}

  @Get()
  async find(@Query('filters') filters: any): Promise<any[]> {
    return this.service.find(filters);
  }

  @Get(':id')
  async findById(@Param('id') id: string | ObjectId): Promise<any> {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() params: any): Promise<any> {
    return this.service.create(params);
  }

  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body() params: any,
  ): Promise<any> {
    return this.service.update(id, params);
  }

  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId): Promise<any> {
    return this.service.delete(id);
  }
}
