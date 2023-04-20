import { Injectable } from '@nestjs/common';
import { ScheduleInterface } from './schedule.interface';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DisableUsersService implements ScheduleInterface {
  @Cron(CronExpression.EVERY_10_SECONDS)
  run(): void {
    console.log('deleted users');
  }
}
