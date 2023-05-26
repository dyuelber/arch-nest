import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import * as Joi from 'joi';
import { ClientSession } from 'mongoose';

export interface AbstractInterface {
  find(filter: any): any;
  findById(id: string): any;
  create(params: any, session?: ClientSession): any;
  update(id: string, params: any, session?: ClientSession): any;
  delete(id: string, session?: ClientSession): any;
}

export interface IAbstractFilters {
  search: string;
}

export interface ControllerOptions {
  createValidation?: Joi.ObjectSchema<any>;
  apiCreateSchema?: ApiOperationOptions;
  apiCreateResponseSchema?: ApiResponseOptions;
  updateValidation?: Joi.ObjectSchema<any>;
  apiUpdateSchema?: ApiOperationOptions;
  apiUpdateResponseSchema?: ApiResponseOptions;
}
