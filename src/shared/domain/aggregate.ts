import { Entity } from "./entity";
import { Notification } from "./notification";
import "../extensions/array"

export class ResultEntity<T extends Aggregate> {
    constructor(private readonly aggregate: T) {}

    isSuccess() : boolean {
        return this.aggregate.isValid()
    }

    isFail() : boolean {
        return !this.aggregate.isValid()
    }

    notifications (): Notification[] {
        if (this.isFail()) {
            return this.aggregate.validators()
        }
        throw new Error('Entity was built with success')
    }

    entity (): T {
        if (this.isSuccess()) {
            return this.aggregate
        }
        throw new Error('Entity was built with erros')
    }
}

export abstract class Aggregate implements Entity {

    abstract validators(): Notification[] 

    isValid(): boolean {
        return this.validators().filterNotificationsWithValue().isEmpty()
    }

}

