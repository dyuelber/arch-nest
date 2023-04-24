import { Module } from '@nestjs/common';
import { DisableUsersService } from './disable-users.service';
import { ActiveUsersService } from './active-users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [],
  providers: [UsersService, DisableUsersService, ActiveUsersService],
})
export class TasksModule {}
