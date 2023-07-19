import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from './event-name.enums';

@Injectable()
export class Event {
  protected static emitter: EventEmitter2;

  constructor(eventEmitter: EventEmitter2) {
    Event.emitter = eventEmitter;
  }

  static async dispatch(event: Events, payload: unknown) {
    Event.emitter.emitAsync(event, payload);
  }
}
