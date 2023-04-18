import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from 'src/abstract/abstract.service';
import { Users } from './entities/user.entity';
import { IUsers } from './interfaces/users.interface';

@Injectable()
export class UsersService extends AbstractService {
  constructor(@InjectModel(Users.name) protected model: Model<Users>) {
    super();
    this.model = model;
  }

  getUsers(): IUsers {
    return this.findById('643deecbe1b3f7279f859d26');
    // return {
    //   name: '',
    //   age: '',
    // };
  }
}
