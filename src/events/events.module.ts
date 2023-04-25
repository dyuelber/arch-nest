import { Module } from '@nestjs/common';
import { NewUser } from './new-user.event';

@Module({
  imports: [],
  controllers: [],
  providers: [NewUser],
})
export class EventsModule {}
