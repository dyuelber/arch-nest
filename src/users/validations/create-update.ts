import { ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import j2s from 'joi-to-swagger';
import * as Joi from 'joi';

const createUser = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
}).messages({
  name: 'name is required',
  age: 'age is required',
});

// api specs
const { swagger: createSchema } = j2s(createUser);

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

export { createUser, apiOperationCreate, apiOperationCreateResponse };
