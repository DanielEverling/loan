import { CreateCustomerCommandHandler } from "./ create.customer.command.handler"

import { CreateCustomerSpecification } from "../domain/create.customer.specification"
import { CustomerRepository } from "../domain/customer.repository"
import { Notification } from "@base/shared/domain/notification"
import { EventPublisher } from "@base/shared/events/event.publisher"
describe('Should test the create customer command handler', () => {

    let createCustomerSpecification: CreateCustomerSpecification
    let customerRepository: CustomerRepository
    let eventPublisher: EventPublisher
    let createCustomerCommandHandler: CreateCustomerCommandHandler

    beforeEach(() => {
        customerRepository = jest.createMockFromModule("../domain/customer.repository")
        eventPublisher = jest.createMockFromModule("@base/shared/events/event.publisher")
        createCustomerSpecification = jest.createMockFromModule("../domain/create.customer.specification")
        createCustomerCommandHandler = new CreateCustomerCommandHandler(createCustomerSpecification, customerRepository, eventPublisher)
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
        eventPublisher.publish = jest.fn()

        createCustomerCommandHandler.handler(command)
        expect(customerRepository.save).toHaveBeenCalledTimes(1)
        expect(eventPublisher.publish).toHaveBeenCalledTimes(1)
    })
    
    it('should return notifications when command is not valid', () => {
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
        eventPublisher.publish = jest.fn()

        const receivedNotifications = createCustomerCommandHandler.handler(command)
        expect(customerRepository.save).not.toHaveBeenCalled
        expect(eventPublisher.publish).not.toHaveBeenCalled
        expect(receivedNotifications).toBeTruthy
    })
})