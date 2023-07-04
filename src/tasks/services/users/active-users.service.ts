import { Injectable } from '@nestjs/common';
import { ScheduleInterface } from '../../interfaces/schedule.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../../../app/users/users.service';

@Injectable()
export class ActiveUsersService implements ScheduleInterface {
  constructor(protected service: UsersService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async run(): Promise<void> {
    //const user = await this.service.findById('647df7d4c98283467c43e8a1');
    //console.log('🚀 ~ ActiveUsersService ~ run ~ user:', user);
    //console.log('users');
  }
}
