import * as Joi from 'joi';

const createUser = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
}).messages({
  name: 'name is required',
  age: 'age is required',
});

export { createUser };
