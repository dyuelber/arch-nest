import { Account } from './account';

export class RealiseAccount extends Account {
  public calc(val: number): number {
    return val * val;
  }

  public print(name: string): string {
    return name;
  }
}
