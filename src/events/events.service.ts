import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events, TypeEvent } from './event-name.enums';

@Injectable()
export class EventService {
  protected static emitter: EventEmitter2;

  constructor(eventEmitter: EventEmitter2) {
    EventService.emitter = eventEmitter;
  }

  static async dispatch(
    event: Events,
    payload: any,
    type: TypeEvent = TypeEvent.resource,
  ) {
    const values = await EventService.formatEvent(event, payload, type);

    EventService.emitter.emitAsync(event, values);
  }

  static async formatEvent(event: Events, payload: any, type: TypeEvent) {
    const responseByType = {
      [TypeEvent.resource]: payload,
      [TypeEvent.integration]: { _id: payload['_id'] },
    };

    const data = responseByType[type];

    return {
      event: event,
      type: type,
      data,
    };
  }
}
