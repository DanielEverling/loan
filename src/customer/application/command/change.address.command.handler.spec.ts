import { ResultEntity } from "@base/shared/domain/aggregate"
import { DefaultSpecification } from "@base/shared/domain/default.specification"
import { Address } from "@base/shared/domain/vo/address"
import { Email } from "@base/shared/domain/vo/email"
import { FullName } from "@base/shared/domain/vo/fullname"
import { SSNumber } from "@base/shared/domain/vo/ssnumber"
import { Customer } from "../domain/customer"
import { CustomerRepository } from "../domain/customer.repository"
import { ChangeCustomerCommandHandler } from "./change.address.command.handler"

describe('Should test change address command', () => {

    let customerRepository: CustomerRepository
    let changeCustomerCommandHandler: ChangeCustomerCommandHandler
    let resultCustomer: ResultEntity<Customer>

    beforeEach(() => {
        customerRepository = jest.createMockFromModule("../domain/customer.repository")
        changeCustomerCommandHandler = new ChangeCustomerCommandHandler(customerRepository)

        const fullName = FullName.of('John Will')
        const email = Email.of('john@gmail.com')
        const ssNumber = SSNumber.of('112121212')
        const address =  Address.of('some address', '100', 'NA', 'some neigborhood','some city', 'CA', '10399-111')

        resultCustomer = Customer.build({
            fullname : fullName,
            email : email,
            ssNumber : ssNumber,
            address : address,
            specification : DefaultSpecification.of()
        })
    })

    it('should process command with success', () => {
        const command = {
            ssNumber: '112121212',
            street: 'other address', 
            number: '100', 
            complement: 'NA', 
            neighborhood: 'other neigborhood',
            city: 'other city', 
            state: 'CA', 
            zipcode: '10399-111'
        }

        customerRepository.findBySSNumber = jest.fn(expectedSsNumber => resultCustomer.entity())
        customerRepository.updateAddress = jest.fn()
        changeCustomerCommandHandler.handler(command)
        expect(customerRepository.updateAddress).toHaveBeenCalledTimes(1)
    })

    it('should return notifications when command is not valid', () => {
        const command = {
            ssNumber: '112121212',
            street: '', 
            number: '', 
            complement: 'NA', 
            neighborhood: 'other neigborhood',
            city: 'other city', 
            state: 'CA', 
            zipcode: '10399-111'
        }
        
        customerRepository.findBySSNumber = jest.fn(expectedSsNumber => resultCustomer.entity())
        const receivedNotifications = changeCustomerCommandHandler.handler(command)
        expect(customerRepository.updateAddress).not.toHaveBeenCalled
        expect(receivedNotifications).toBeTruthy
    })
})