import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AbstractService } from '../abstract/abstract.service';
import { Users } from './entities/user.entity';
import { NewUser } from '../events/new-user.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UsersService extends AbstractService {
  constructor(
    @InjectModel(Users.name) protected model: Model<Users>,
    protected newUser: NewUser,
    private eventEmitter: EventEmitter2,
  ) {
    super(model);
  }

  newUserEvent() {
    this.newUser.name = 'Dyuelber';
    this.eventEmitter.emit('new.user', this.newUser);
  }

  afterUpdate(id: string | ObjectId, params: any) {
    this.newUserEvent();
    return params;
  }
}
