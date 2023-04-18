import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AbstractService } from './abstract.service';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';
import { RequestsPipe } from 'src/validations/requests.pipe';
import Joi from 'joi';

export abstract class AbstractController {
  protected createValidation: Joi.ObjectSchema<any>;
  protected updateValidation: Joi.ObjectSchema<any>;

  constructor(protected service: AbstractService) {}

  @Get()
  @UseGuards(AuthGuard)
  async find(@Query('filters') filters: any): Promise<any[]> {
    return this.service.find(filters);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: string | ObjectId): Promise<any> {
    return this.service.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() params: any): Promise<any> {
    new RequestsPipe(this.createValidation).transform(params, null);

    return this.service.create(params);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string | ObjectId,
    @Body() params: any,
  ): Promise<any> {
    new RequestsPipe(this.updateValidation).transform(params, null);

    return this.service.update(id, params);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string | ObjectId): Promise<any> {
    return this.service.delete(id);
  }
}
