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

    try {
      this.service.begin();
      const response = await this.service.create(params);
      await this.service.commit();

      return response;
    } catch (error) {
      await this.service.rollback();
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string | ObjectId,
    @Body() params: any,
  ): Promise<any> {
    new RequestsPipe(this.updateValidation).transform(params, null);

    try {
      this.service.begin();
      const response = await this.service.update(id, params);
      await this.service.commit();

      return response;
    } catch (error) {
      await this.service.rollback();
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string | ObjectId): Promise<any> {
    try {
      this.service.begin();
      const response = this.service.delete(id);
      await this.service.commit();

      return response;
    } catch (error) {
      await this.service.rollback();
    }
  }
}
