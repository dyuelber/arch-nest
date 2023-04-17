export abstract class Account {
  protected response: string;

  public abstract calc(val: number): number;

  public abstract print(name: string): string;

  public exec(val: number, name: string): IAccount {
    return {
      calc: this.calc(val),
      print: this.print(name),
    };
  }

  public getResponse(): string {
    return this.response;
  }

  public setResponse(response: string) {
    this.response = response;
  }
}

export interface IAccount {
  calc: number;
  print: string;
}
