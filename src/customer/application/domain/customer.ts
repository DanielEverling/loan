import { ResultCommand } from "@base/shared/domain/result.command";
import { Aggregate, ResultEntity } from "@shared/domain/aggregate";
import { Notification } from "@shared/domain/notification";
import { Address } from "@shared/domain/vo/address";
import { Email } from "@shared/domain/vo/email";
import { FullName } from "@shared/domain/vo/fullname";
import { SSNumber } from "@shared/domain/vo/ssnumber";

type CustomerOptions = {
    fullname: FullName, 
    email: Email, 
    address: Address, 
    ssNumber: SSNumber
}
 
export class Customer extends Aggregate {
    
    private constructor(
        readonly fullname: FullName, 
        readonly email: Email, 
        private _address: Address, 
        readonly ssNumber: SSNumber) {
        super()
    }

    public get address() : Address {
        return this._address
    }

    validators(): Notification[] {
        return [
            ...this.fullname.validators(),
            ...this.email.validators(),
            ...this._address.validators(),
            ...this.ssNumber.validators()
        ]
    }

    public changeAddress(newAddress: Address) : ResultCommand {
        const notifications = newAddress.validators().filterNotificationsWithValue()
        if (notifications.isEmpty()) {
            this._address = newAddress
            return ResultCommand.empty()
        }
        return ResultCommand.of(notifications)
    }

    public static build(options: CustomerOptions): ResultEntity<Customer> {
        const newCustomer = new Customer(options.fullname, options.email, options.address, options.ssNumber)
        return new ResultEntity(newCustomer)
    }
}