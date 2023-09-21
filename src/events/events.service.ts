import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from './event-name.enums';

@Injectable()
export class EventService {
  protected static emitter: EventEmitter2;

  constructor(eventEmitter: EventEmitter2) {
    EventService.emitter = eventEmitter;
  }

  static async dispatch(event: Events, payload: unknown) {
    EventService.emitter.emitAsync(event, payload);
  }
}
