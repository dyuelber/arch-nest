import { Module } from '@nestjs/common';
import { Notifyuser } from './notify-user';

@Module({
  imports: [],
  controllers: [],
  providers: [Notifyuser],
})
export class ListenerModule {}
