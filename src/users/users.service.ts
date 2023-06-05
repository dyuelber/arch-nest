import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '../abstract/abstract.service';
import { Users, UsersDocument } from './entities/user.entity';
import { Event } from '../events/events.service';
import { Events } from '../events/event-name.enums';

@Injectable()
export class UsersService extends AbstractService<UsersDocument> {
  constructor(
    @InjectModel(Users.name)
    protected model: Model<UsersDocument>,
  ) {
    super(model);
  }

  afterCreate(params: any): Promise<UsersDocument> {
    Event.dispatch(Events.userCreate, params);
    return params;
  }

  afterUpdate(id: string, params: any): Promise<UsersDocument> {
    Event.dispatch(Events.userUpdate, params);
    return params;
  }
}
