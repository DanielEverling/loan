import { Notification } from "../notification";
import { ValueObject } from "../value.object";
import '../../extensions/string'

export class FullName implements ValueObject {

    private constructor(readonly value: string) {}

    static of (value: string): FullName {
        return new FullName(value)
    }
    
    validators(): Array<Notification> {
        return [
            this.value.isEmpty('Name is required.'),
            this.value.validateSizeLessThan(100, 'Name should be less than 100 characters.')
        ]
    }
}