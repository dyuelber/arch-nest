import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../events/event-name.enums';

export class UserListener {
  @OnEvent(Events.userCreate)
  create(payload: any) {
    console.log('event', Events.userCreate);
    console.log('payload', payload);
  }

  @OnEvent(Events.userUpdate)
  update(payload: any) {
    console.log('event', Events.userUpdate);
    console.log('payload', payload);
  }
}
