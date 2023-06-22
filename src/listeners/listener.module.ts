import { Module } from '@nestjs/common';
import { UserListener } from './user.listener';

@Module({
  imports: [],
  controllers: [],
  providers: [UserListener],
})
export class ListenerModule {}
