import { Controller, Get, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersInterface } from './interfaces/users.interface';

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  async users(): Promise<UsersInterface> {
    return this.usersService.getUsers();
  }
}
