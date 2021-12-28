import { CreateCustomerCommandHandler } from "./ create.customer.command.handler"

import { CreateCustomerSpecification } from "../domain/create.customer.specification"
import { CustomerRepository } from "../domain/customer.repository"
import { Notification } from "@base/shared/domain/notification"
describe('Should test the create customer command handler', () => {

    let createCustomerSpecification: CreateCustomerSpecification
    let customerRepository: CustomerRepository
    let createCustomerCommandHandler: CreateCustomerCommandHandler

    beforeEach(() => {
        customerRepository = jest.createMockFromModule("../domain/customer.repository")
        createCustomerSpecification = jest.createMockFromModule("../domain/create.customer.specification")
        createCustomerCommandHandler = new CreateCustomerCommandHandler(createCustomerSpecification, customerRepository)
    })

    it('should process command with success', () => {
        const command = {
            fullname: 'John will',
            email: 'john@gmail.com',
            ssNumber: '112121212',
            street: 'some address', 
            number: '100', 
            complement: 'NA', 
            neighborhood: 'some neigborhood',
            city: 'some city', 
            state: 'CA', 
            zipcode: '10399-111'
        }
        createCustomerSpecification.isSatisfied = jest.fn(customer => Notification.empty())
        customerRepository.save = jest.fn()
        
        createCustomerCommandHandler.handler(command)
        expect(customerRepository.save).toHaveBeenCalledTimes(1)
    })
    
    it('should throw error when command is not valid', () => {
        const command = {
            fullname: '',
            email: '',
            ssNumber: '',
            street: 'some address', 
            number: '100', 
            complement: 'NA', 
            neighborhood: 'some neigborhood',
            city: 'some city', 
            state: 'CA', 
            zipcode: '10399-111'
        }
        createCustomerSpecification.isSatisfied = jest.fn(customer => Notification.empty())
        customerRepository.save = jest.fn()
        
        const receivedNotifications = createCustomerCommandHandler.handler(command)
        expect(customerRepository.save).not.toHaveBeenCalled
        expect((receivedNotifications)).toBeTruthy
    })
})