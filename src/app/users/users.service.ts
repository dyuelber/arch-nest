import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '../../abstract/abstract.service';
import { Users } from './entities/user.entity';
import { Event } from '../../events/events.service';
import { Events } from '../../events/event-name.enums';
import { IAbstractFilters } from '../../abstract/abstract.interface';

@Injectable()
export class UsersService extends AbstractService<Users> {
  constructor(@InjectModel(Users.name) protected model: Model<Users>) {
    super(model);
  }

  createPipeline(filters: IAbstractFilters): any[] {
    return [
      {
        $match: {
          age: {
            $gte: 18,
          },
        },
      },
    ];
  }

  afterCreate(params: any): Promise<Users> {
    Event.dispatch(Events.userCreate, params);
    return params;
  }

  afterUpdate(id: string, params: any): Promise<Users> {
    Event.dispatch(Events.userUpdate, params);
    return params;
  }
}
