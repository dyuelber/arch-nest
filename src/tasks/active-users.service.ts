import { Injectable } from '@nestjs/common';
import { ScheduleInterface } from './schedule.interface';
import { UsersService } from '../users/users.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ActiveUsersService implements ScheduleInterface {
  constructor(protected service: UsersService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async run() {
    //const user = await this.service.findById('643ea10c9753f2277588f91f');
    console.log('users');
  }
}
