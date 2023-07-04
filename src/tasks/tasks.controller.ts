import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ActiveUsersService } from './services/users/active-users.service';
import { DisableUsersService } from './services/users/disable-users.service';

@Controller('tasks')
export class TasksController {
  constructor(private module: ModuleRef) {}

  private async getServiceByName(name: string) {
    const tasks = {
      ['activeUsers']: ActiveUsersService,
      ['disableUsers']: DisableUsersService,
      //['custonName']: ClassServiceTask,
    };

    return tasks[name] ?? new Error('task not found');
  }

  @Get(':name')
  async run(@Param('name') name: string) {
    try {
      const service = await this.getServiceByName(name);

      return await this.module
        .resolve(service)
        .then(async (instance) => await instance.run());
    } catch (error) {
      throw new HttpException(
        error?.response ?? error?.message,
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}
