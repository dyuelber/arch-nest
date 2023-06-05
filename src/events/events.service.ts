import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class Event {
  protected static emitter: EventEmitter2;

  constructor(eventEmitter: EventEmitter2) {
    Event.emitter = eventEmitter;
  }

  static async dispatch(event: string, payload: any) {
    Event.emitter.emitAsync(event, payload);
  }
}
