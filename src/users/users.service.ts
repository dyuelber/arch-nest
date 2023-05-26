import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '../abstract/abstract.service';
import { Users, UsersDocument } from './entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UsersService extends AbstractService<UsersDocument> {
  constructor(
    @InjectModel(Users.name)
    protected model: Model<UsersDocument>,
    private eventEmitter: EventEmitter2,
  ) {
    super(model);
  }

  afterUpdate(id: string, params: any): Promise<UsersDocument> {
    this.eventEmitter.emitAsync('new.user', params);
    return params;
  }
}
