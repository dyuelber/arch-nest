import { OnEvent } from '@nestjs/event-emitter';
import { NewUser } from '../events/new-user.event';

export class Notifyuser {
  @OnEvent('new.user')
  notify(payload: NewUser) {
    console.log('New User');
    console.log(payload.name);
  }
}
