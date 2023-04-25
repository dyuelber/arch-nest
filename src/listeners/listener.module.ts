import { Module } from '@nestjs/common';
import { Notifyuser } from './notify-user';
import { NewUser } from '../events/new-user.event';

@Module({
  imports: [NewUser],
  controllers: [],
  providers: [Notifyuser],
})
export class ListenerModule {}
