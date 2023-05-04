import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { AbstractController } from '../abstract/abstract.controller';
import { createUser } from './validations/create';

@Controller('users')
export class UsersController extends AbstractController {
  constructor(protected usersService: UsersService) {
    super(usersService);
    this.createValidation = createUser;
    this.updateValidation = createUser;
  }
}
