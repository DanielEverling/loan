import { Address } from "@base/shared/domain/vo/address"
import { SSNumber } from "@base/shared/domain/vo/ssnumber"
import { CustomerRepository } from "../domain/customer.repository"
import { ChangeAddressCommand } from "./change.address.command"
export class ChangeCustomerCommandHandler {

    constructor(private customerRepository: CustomerRepository) {}

    handler(command: ChangeAddressCommand): Notification[] | void {
        const customer = this.customerRepository.findBySSNumber(SSNumber.of(command.ssNumber))
        
        if (customer) {
            const newAddress = Address.of(command.street, command.number, command.complement, command.neighborhood, command.city, command.state, command.zipcode)
            const commandResult = customer.changeAddress(newAddress)

            return commandResult.proccess(
                () => {
                    this.customerRepository.updateAddress(customer.address, customer.ssNumber)
                    return
                }
                ,
                () => {
                    return commandResult.notifications
                }
            )
        }
    }
}