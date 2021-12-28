import { Event } from "../event";

export class CreatedCustomerEvent implements Event {

    static EVENT_NAME = 'created.customer.event'
    
    constructor(private readonly fullName: string, private readonly email: string) {}

    get name(): string {
        return CreatedCustomerEvent.EVENT_NAME
    }

    get payload(): any {
        return {
            fullName : this.fullName,
            email : this.email
        }
    }
}