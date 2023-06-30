import { Injectable } from '@nestjs/common';
import { ScheduleInterface } from '../../interfaces/schedule.interface';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DisableUsersService implements ScheduleInterface {
  @Cron(CronExpression.EVERY_10_SECONDS)
  async run(): Promise<void> {
    console.log('deleted users');
  }
}
