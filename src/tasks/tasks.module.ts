import { Module } from '@nestjs/common';
import { DisableUsersService } from './disable-users.service';
import { ActiveUsersService } from './active-users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { EventsModule } from '../events/events.module';
import { NewUser } from '../events/new-user.event';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    EventsModule,
  ],
  controllers: [],
  providers: [UsersService, DisableUsersService, ActiveUsersService, NewUser],
})
export class TasksModule {}
