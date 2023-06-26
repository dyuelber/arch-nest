import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import j2s from 'joi-to-swagger';
import * as Joi from 'joi';

const createProduct = Joi.object({
  name: Joi.string().optional(),
  amount: Joi.number().optional(),
  status: Joi.string().optional(),
}).messages({
  name: 'name is required',
  age: 'age is required',
  status: 'status',
});

// api specs
const { swagger: createSchema } = j2s(createProduct);

const apiOperationCreate = {
  summary: 'Create user',
  description: `Create user in system`,
  requestBody: {
    required: true,
    content: { 'application/json': { schema: createSchema } },
  },
} as ApiOperationOptions;

const apiOperationCreateResponse = {
  status: 201,
  description: 'Success',
  schema: createSchema,
} as ApiResponseOptions;

export { createProduct, apiOperationCreate, apiOperationCreateResponse };
