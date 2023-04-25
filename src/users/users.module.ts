import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import { NewUser } from 'src/events/new-user.event';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    EventsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, NewUser],
})
export class UsersModule {}
