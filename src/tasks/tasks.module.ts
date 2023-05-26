import { Module } from '@nestjs/common';
import { DisableUsersService } from './services/disable-users.service';
import { ActiveUsersService } from './services/active-users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    EventsModule,
  ],
  controllers: [],
  providers: [UsersService], //DisableUsersService, ActiveUsersService],
})
export class TasksModule {}
