import { ListenerModule } from './listeners/listener.module';
import { EventsModule } from './events/events.module';
import { TasksModule } from './tasks/tasks.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './midllewares/logger.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LogActionsMiddleware } from './midllewares/log-actions.middleware';
import configuration from './config/configuration';

@Module({
  imports: [
    ListenerModule,
    EventsModule,
    TasksModule,
    UsersModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({ delimiter: '.' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogActionsMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
