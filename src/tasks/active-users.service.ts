import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScheduleInterface } from './schedule.interface';

@Injectable()
export class ActiveUsersService implements ScheduleInterface {
  @Cron(CronExpression.EVERY_SECOND)
  run(): void {
    console.log('active users');
  }
}
