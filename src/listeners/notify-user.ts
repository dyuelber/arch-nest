import { OnEvent } from '@nestjs/event-emitter';

export class Notifyuser {
  @OnEvent('new.user')
  notify(payload: any) {
    console.log('New User');
    console.log(payload.name);
  }
}
