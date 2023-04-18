import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from 'src/abstract/abstract.service';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService extends AbstractService {
  constructor(@InjectModel(Users.name) protected model: Model<Users>) {
    super(model);
  }
}
