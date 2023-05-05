import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import * as Joi from 'joi';
import { ObjectId } from 'mongoose';

export interface AbstractInterface {
  find(filter: any): any;
  findById(id: string | ObjectId): any;
  create(params: any): any;
  update(id: string | ObjectId, params: any): any;
  delete(id: string | ObjectId): any;
}

export interface ControllerOptions {
  createValidation?: Joi.ObjectSchema<any>;
  apiCreateSchema?: ApiOperationOptions;
  apiCreateResponseSchema?: ApiResponseOptions;
  updateValidation?: Joi.ObjectSchema<any>;
  apiUpdateSchema?: ApiOperationOptions;
  apiUpdateResponseSchema?: ApiResponseOptions;
}
