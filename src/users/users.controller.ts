import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { abstract } from '../abstract/abstract.controller';
import {
  apiOperationCreate,
  apiOperationCreateResponse,
  createUser,
} from './validations/create';

const AbstractController = abstract({
  createValidation: createUser,
  apiCreateSchema: apiOperationCreate,
  apiCreateResponseSchema: apiOperationCreateResponse,
  updateValidation: createUser,
  apiUpdateSchema: apiOperationCreate,
  apiUpdateResponseSchema: apiOperationCreateResponse,
});

@Controller('users')
export class UsersController extends AbstractController {
  constructor(protected usersService: UsersService) {
    super(usersService);
  }
}
