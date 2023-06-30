import { Controller, Get, Param } from '@nestjs/common';
import { handle } from './config';

@Controller('tasks')
export class TasksController {
  @Get(':name')
  async run(@Param('name') name: string) {
    const task = await handle(name);
    return await new task().run();
  }
}
