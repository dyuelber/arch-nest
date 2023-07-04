import { TasksController } from './tasks.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from '../events/events.module';
import { Users, UsersSchema } from '../app/users/entities/user.entity';
import { DisableUsersService } from './services/users/disable-users.service';
import { ActiveUsersService } from './services/users/active-users.service';
import { UsersService } from '../app/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    EventsModule,
  ],
  controllers: [TasksController],
  providers: [UsersService, DisableUsersService, ActiveUsersService],
})
export class TasksModule {}
