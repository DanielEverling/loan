import { Notification } from "@base/shared/domain/notification";
import { Address } from "@base/shared/domain/vo/address";
import { Email } from "@base/shared/domain/vo/email";
import { FullName } from "@base/shared/domain/vo/fullname";
import { SSNumber } from "@base/shared/domain/vo/ssnumber";
import { EventPublisher } from "@base/shared/events/event.publisher";
import { CreatedCustomerEvent } from "@base/shared/events/schema/created.customer.event";
import { CreateCustomerSpecification } from "../domain/create.customer.specification";
import { Customer } from "../domain/customer";
import { CustomerRepository } from "../domain/customer.repository";
import { CreateCustomerCommand } from "./ create.customer.command";

export class CreateCustomerCommandHandler {

    constructor(private createCustomerSpecification: CreateCustomerSpecification, 
        private customerRepository: CustomerRepository,
        private eventPublisher: EventPublisher) {}

    handler(command: CreateCustomerCommand): Notification[] | void {

        const customerResult = Customer.build({
            fullname: FullName.of(command.fullname),
            email: Email.of(command.email),
            ssNumber: SSNumber.of(command.ssNumber),
            address: Address.of(command.street, command.number, command.complement, command.neighborhood, command.city, command.state, command.zipcode),
            specification: this.createCustomerSpecification
        })

        if (customerResult.isSuccess()) {
            const customer = customerResult.entity()
            this.customerRepository.save(customer)
            this.eventPublisher.publish(new CreatedCustomerEvent(customer.fullname.value, customer.email.value))
            return
        }
        return customerResult.notifications()
    }
}