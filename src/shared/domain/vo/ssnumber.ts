import { Notification } from "../notification";
import { ValueObject } from "../value.object";
import "../../extensions/string"

export class SSNumber implements ValueObject {

    private constructor (private readonly _value: string) {}

    public static of(value: string) : SSNumber {
        return new SSNumber(value)
    }

    validators(): Notification[] {
        return [
            this._value.exactLengt(9, 'SS Number should have 9 caracters.')
        ]
    }

    get value(): string {
        const begin = this._value.substring(0, 3);
        const middle = this._value.substring(3, 5);
        const end = this._value.substring(5);
    
        return `${begin}-${middle}-${end}`;
    }
}