import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AbstractService } from './abstract.service';
import { ClientSession } from 'mongoose';
import { AuthGuard } from '../guards/auth.guard';
import { RequestsPipe } from '../validations/requests.pipe';
import Joi from 'joi';
import { IAbstractFilters } from './abstract.interface';
import { IPaginateResult } from '../utils/interfaces.util';

@UseGuards(AuthGuard)
export abstract class AbstractController<T> {
  protected createValidation: Joi.ObjectSchema<any>;
  protected updateValidation: Joi.ObjectSchema<any>;
  protected session: ClientSession;

  constructor(protected service: AbstractService<T>) {}

  async createSession() {
    //this.session = await this.service.getModel().db.startSession();
  }

  async begin() {
    //this.session.startTransaction();
  }

  async commit() {
    //await this.session.commitTransaction();
  }

  async rollback() {
    //await this.session.abortTransaction();
  }

  async closeSession() {
    //await this.session.endSession();
  }

  @Get()
  async find(@Query() filters: IAbstractFilters): Promise<IPaginateResult<T>> {
    try {
      return await this.service.find(filters);
    } catch (error) {
      throw new HttpException(error?.response ?? error?.message, error?.status);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<T> {
    try {
      return await this.service.findById(id);
    } catch (error) {
      throw new HttpException(error?.response ?? error?.message, error?.status);
    }
  }

  @Post()
  async create(@Body() params: object): Promise<T> {
    new RequestsPipe(this.createValidation).transform(params, null);
    await this.createSession();
    try {
      await this.begin();
      const response = await this.service.create(params, this.session);
      await this.commit();

      return response;
    } catch (error) {
      await this.rollback();
      throw new HttpException(
        error?.response ?? error?.message,
        error?.status ?? HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } finally {
      await this.closeSession();
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() params: object): Promise<T> {
    new RequestsPipe(this.updateValidation).transform(params, null);
    await this.createSession();
    try {
      await this.begin();
      const response = await this.service.update(id, params, this.session);
      await this.commit();

      return response;
    } catch (error) {
      await this.rollback();
      throw new HttpException(
        error?.response ?? error?.message,
        error?.status ?? HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } finally {
      await this.closeSession();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<T> {
    await this.createSession();
    try {
      await this.begin();
      const response = await this.service.delete(id);
      await this.commit();

      return response;
    } catch (error) {
      await this.rollback();
      throw new HttpException(
        error?.response ?? error?.message,
        error?.status ?? HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } finally {
      await this.closeSession();
    }
  }
}
