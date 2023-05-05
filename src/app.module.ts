import { ListenerModule } from './listeners/listener.module';
import { EventsModule } from './events/events.module';
import { TasksModule } from './tasks/tasks.module';
import { AbstractModule } from './abstract/abstract.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './midllewares/logger.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import configuration from './config/configuration';

@Module({
  imports: [
    ListenerModule,
    EventsModule,
    TasksModule,
    AbstractModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
