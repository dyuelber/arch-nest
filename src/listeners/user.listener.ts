import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../events/event-name.enums';

export class UserListener {
  @OnEvent(Events.userCreate)
  create(payload: any) {
    console.log('event:', Events.userCreate, 'payload:', payload);
  }

  @OnEvent(Events.userCreate)
  sendEmail(payload: any) {
    console.log('event:', Events.userCreate, 'payload:', payload);
  }

  @OnEvent(Events.userUpdate)
  update(payload: any) {
    console.log('event:', Events.userUpdate, 'payload:', payload);
  }

  @OnEvent(Events.userDelete)
  delete(payload: any) {
    console.log('event:', Events.userUpdate, 'payload:', payload);
  }
}
