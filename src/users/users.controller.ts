import { Controller, Get, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsers } from './interfaces/users.interface';
import console from 'console';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  async users(): Promise<IUsers> {
    console.log('aqui');
    return this.usersService.getUsers();
  }
}
