import { Notification } from '../notification';
import { ValueObject } from '../value.object';
import '../../extensions/string';

export class SSNumber implements ValueObject {
  private constructor(readonly value: string) {}

  public static of(value: string): SSNumber {
    return new SSNumber(value);
  }

  validators(): Notification[] {
    return [this.value.exactLengt(9, 'SS Number should have 9 characters.')];
  }

  get valueWithMask(): string {
    const begin = this.value.substring(0, 3);
    const middle = this.value.substring(3, 5);
    const end = this.value.substring(5);

    return `${begin}-${middle}-${end}`;
  }
}
