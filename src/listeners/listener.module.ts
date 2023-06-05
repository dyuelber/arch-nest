import { Module } from '@nestjs/common';
import { NotifyUser } from './notify-user';

@Module({
  imports: [],
  controllers: [],
  providers: [NotifyUser],
})
export class ListenerModule {}
