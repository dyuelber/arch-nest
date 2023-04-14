import { Injectable } from '@nestjs/common';
import { UsersInterface } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  getUsers(): UsersInterface {
    return {
      name: '',
      teste: '',
      age: '',
    };
  }
}
