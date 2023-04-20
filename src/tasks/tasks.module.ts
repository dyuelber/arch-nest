import { Module } from '@nestjs/common';
import { DisableUsersService } from './disable-users.service';
import { ActiveUsersService } from './active-users.service';

@Module({
  imports: [],
  controllers: [],
  //providers: [DisableUsersService, ActiveUsersService],
})
export class TasksModule {}
