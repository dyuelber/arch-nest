import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import j2s from 'joi-to-swagger';
import * as Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  status: Joi.string().optional(),
}).messages({
  name: 'name is required',
  age: 'age is required',
  status: 'status',
});

const update = Joi.object({
  name: Joi.string().optional(),
  amount: Joi.number().optional(),
  status: Joi.string().optional(),
}).messages({
  name: 'name is required',
  age: 'age is required',
  status: 'status',
});

// api specs
const { swagger: createSchema } = j2s(create);

const apiCreate = {
  summary: 'Create product',
  description: `Create product in system`,
  requestBody: {
    required: true,
    content: { 'application/json': { schema: createSchema } },
  },
} as ApiOperationOptions;

const apiCreateResponse = {
  status: 201,
  description: 'Success',
  schema: createSchema,
} as ApiResponseOptions;

const { swagger: updateSchema } = j2s(update);

const apiUpdate = {
  summary: 'Update product',
  description: `Update product in system`,
  requestBody: {
    required: true,
    content: { 'application/json': { schema: updateSchema } },
  },
} as ApiOperationOptions;

const apiUpdateResponse = {
  status: 201,
  description: 'Success',
  schema: updateSchema,
} as ApiResponseOptions;

export {
  create,
  update,
  apiCreate,
  apiCreateResponse,
  apiUpdate,
  apiUpdateResponse,
};
