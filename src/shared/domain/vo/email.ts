import { Notification } from "../notification";
import { ValueObject } from "../value.object";

import '../../extensions/string'

export class Email implements ValueObject {

    private REGEX = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
    
    private constructor(readonly value: string) {}
    
    static of(value: string) : Email {
        return new Email(value)
    }

    validators(): Array<Notification> {
        return [this.value.hasPattern(this.REGEX, 'E-mail should be valid.')]
    }
    
}