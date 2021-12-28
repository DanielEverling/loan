import { Notification } from "@base/shared/domain/notification";
import { Specification } from "@base/shared/domain/specification";
import { Customer } from "./customer";
import { CustomerRepository } from "./customer.repository";

export class CreateCustomerSpecification implements Specification<Customer> {

    constructor (private readonly customerRepository : CustomerRepository) {}

    isSatisfied(aggregate: Customer): Notification {
        const customerSaved = this.customerRepository.findBySSNumber(aggregate.ssNumber)
        return customerSaved ? Notification.of('Customer already registered.') : Notification.empty()
    }
}