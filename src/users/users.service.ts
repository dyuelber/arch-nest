import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AbstractService } from '../abstract/abstract.service';
import { Users, UsersDocument } from './entities/user.entity';
import { NewUser } from '../events/new-user.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UsersService extends AbstractService<UsersDocument> {
  constructor(
    @InjectModel(Users.name)
    protected model: Model<UsersDocument>,
    protected newUser: NewUser,
    private eventEmitter: EventEmitter2,
  ) {
    super(model);
  }

  updateUserEvent(params: any) {
    this.eventEmitter.emitAsync('new.user', params);
  }

  afterUpdate(id: string | ObjectId, params: any) {
    this.updateUserEvent(params);
    return params;
  }
}
