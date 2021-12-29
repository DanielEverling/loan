import { Notification } from "@base/shared/domain/notification"
import { Address } from "@base/shared/domain/vo/address"
import { SSNumber } from "@base/shared/domain/vo/ssnumber"
import { CustomerRepository } from "../domain/customer.repository"
import { ChangeAddressCommand } from "./change.address.command"
export class ChangeCustomerCommandHandler {

    constructor(private customerRepository: CustomerRepository) {}

    async handler(command: ChangeAddressCommand): Promise<Notification[] | void> {
        const customer = await this.customerRepository.findBySSNumber(SSNumber.of(command.ssNumber))
        
        if (customer) {
            const newAddress = Address.of(command.street, command.number, command.complement, command.neighborhood, command.city, command.state, command.zipcode)
            const commandResult = customer.changeAddress(newAddress)

            if (commandResult.isSuccess()) {
                await this.customerRepository.updateAddress(customer.address, customer.id)
                return
            }
            return commandResult.notifications
        }
    }
}