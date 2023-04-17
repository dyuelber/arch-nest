import { Injectable } from '@nestjs/common';
import { RealiseAccount } from './realise-account';

@Injectable()
export class SolidService {
  constructor(protected service: RealiseAccount) {}

  accountResponse(val: number, name: string) {
    return this.service.exec(val, name);
  }

  getResponse() {
    this.service.setResponse('Mano Doido');
    return this.service.getResponse();
  }
}
