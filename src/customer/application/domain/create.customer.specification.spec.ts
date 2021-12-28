import { Notification } from "@base/shared/domain/notification";
import { CreateCustomerSpecification } from "./create.customer.specification";
import { Customer } from "./customer";
import { CustomerRepository } from "./customer.repository";

describe ('Should test create customer speficification', () => {

    let createCustomerSpecification: CreateCustomerSpecification
    let customerRepository: CustomerRepository

    beforeEach(() => {
        customerRepository = jest.createMockFromModule("./customer.repository")
        createCustomerSpecification = new CreateCustomerSpecification(customerRepository)
    });
      
    it('should return notification when there is a customer registred', () => {
        const customer: Customer  = jest.createMockFromModule("./customer")
        customerRepository.findBySSNumber = jest.fn(expectedSsNumber => customer)
        const notificationReceived = createCustomerSpecification.isSatisfied(customer)
        const expectedNotification = Notification.of('Customer already registered.')
        expect(notificationReceived).toEqual(expectedNotification)
    })

    it('should return empty notification when there is not a customer registred', () => {
        const customer: Customer  = jest.createMockFromModule("./customer")
        customerRepository.findBySSNumber = jest.fn(expectedSsNumber => null)
        const notificationReceived = createCustomerSpecification.isSatisfied(customer)
        const expectedNotification = Notification.empty()
        expect(notificationReceived).toEqual(expectedNotification)
    })
    
})