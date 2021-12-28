import { DefaultSpecification } from "@base/shared/domain/default.specification"
import { Notification } from "@base/shared/domain/notification"
import { ResultCommand } from "@base/shared/domain/result.command"
import { Address } from "@shared/domain/vo/address"
import { Email } from "@shared/domain/vo/email"
import { FullName } from "@shared/domain/vo/fullname"
import { SSNumber } from "@shared/domain/vo/ssnumber"
import { CreateCustomerSpecification } from "./create.customer.specification"
import { Customer } from "./customer"

describe ('Should validate curstomer rules', () => {

    it('should create a new customer with success', () => {
        const expectedFullName = FullName.of('John Will')
        const expectedEmail = Email.of('john@gmail.com')
        const expectedSsNumber = SSNumber.of('112121212')
        const expectedAddress =  Address.of('some address', '100', 'NA', 'some neigborhood','some city', 'CA', '10399-111')

        const resultCustomer = Customer.build({
            fullname : expectedFullName,
            email : expectedEmail,
            ssNumber : expectedSsNumber,
            address :expectedAddress,
            specification : DefaultSpecification.of()
        })

        const newCustomer = resultCustomer.entity()
        expect(true).toEqual(resultCustomer.isSuccess())
        expect(expectedFullName).toEqual(newCustomer.fullname)
        expect(expectedEmail).toEqual(newCustomer.email)
        expect(expectedSsNumber).toEqual(newCustomer.ssNumber)
        expect(expectedAddress).toEqual(newCustomer.address)
    })

    it('should validate a new customer with empty fields', () => {
        const emptyFullName = FullName.of('')
        const emptyEmail = Email.of('')
        const emptySsNumber = SSNumber.of('')
        const emptyAddress =  Address.of('', '', '', '','', '', '')

        const resultCustomer = Customer.build({
            fullname : emptyFullName,
            email : emptyEmail,
            ssNumber : emptySsNumber,
            address : emptyAddress,
            specification : DefaultSpecification.of()
        })

        const expectedNotifications = [
            Notification.of('Name is required.'),
            Notification.of('E-mail should be valid.'),
            Notification.of('Street is required.'),
            Notification.of('Neighborhood is required.'),
            Notification.of('Zipcode is required.'),
            Notification.of('City is required.'),
            Notification.of('State is required.'),
            Notification.of('SS Number should have 9 caracters.'),
        ]
        
        const receivedNotifications = resultCustomer.notifications()
        expect(receivedNotifications.filterNotificationsWithValue()).toEqual(expectedNotifications)
        expect(true).toEqual(resultCustomer.isFail())
    })

    it('should validate a new customer with invalid fields', () => {
        const invalidFields = ''.generate(300)
        const emptyFullName = FullName.of(invalidFields)
        const emptyEmail = Email.of(invalidFields)
        const emptySsNumber = SSNumber.of(invalidFields)
        const emptyAddress =  Address.of(invalidFields, invalidFields, invalidFields, invalidFields, invalidFields, invalidFields, invalidFields)

        const resultCustomer = Customer.build({
            fullname : emptyFullName,
            email : emptyEmail,
            ssNumber : emptySsNumber,
            address : emptyAddress,
            specification : DefaultSpecification.of()
        })

        const expectedNotifications = [
            Notification.of('Name should be less than 100 characters.'),
            Notification.of('E-mail should be valid.'),
            Notification.of('Street should be less than 100 characters.'),
            Notification.of('Number should be less than 6 characters.'),
            Notification.of('Neighborhood should be less than 50 characters.'),
            Notification.of('Zipcode is required.'),
            Notification.of('City should be less than 50 characters.'),
            Notification.of('State should be less than 2 characters.'),
            Notification.of('Complement should be less than 100 characters.'),
            Notification.of('SS Number should have 9 caracters.')
        ]

        const receivedNotifications = resultCustomer.notifications()
        expect(receivedNotifications.filterNotificationsWithValue()).toEqual(expectedNotifications)
        expect(true).toEqual(resultCustomer.isFail())
    })

    it('should change address for a customer', () => {
        const expectedFullName = FullName.of('John Will')
        const expectedEmail = Email.of('john@gmail.com')
        const expectedSsNumber = SSNumber.of('112121212')
        const expectedAddress =  Address.of('some address', '100', 'NA', 'some neigborhood','some city', 'CA', '10399-111')

        const resultCustomer = Customer.build({
            fullname : expectedFullName,
            email : expectedEmail,
            ssNumber : expectedSsNumber,
            address :expectedAddress,
            specification : DefaultSpecification.of()
        })

        const newCustomer = resultCustomer.entity()
        const newAddress =  Address.of('other address', '123', 'NA', 'other neigborhood','other city', 'CA', '10399-111')
        const receivedResult = newCustomer.changeAddress(newAddress)
        expect(receivedResult).toEqual(ResultCommand.empty())
        expect(newAddress).toEqual(newCustomer.address)
    })

    it('should validate change address with empty value', () => {
        const expectedFullName = FullName.of('John Will')
        const expectedEmail = Email.of('john@gmail.com')
        const expectedSsNumber = SSNumber.of('112121212')
        const expectedAddress =  Address.of('some address', '100', 'NA', 'some neigborhood','some city', 'CA', '10399-111')

        const resultCustomer = Customer.build({
            fullname : expectedFullName,
            email : expectedEmail,
            ssNumber : expectedSsNumber,
            address :expectedAddress,
            specification : DefaultSpecification.of()
        })

        const expectedNotifications = [
            Notification.of('Street is required.'),
            Notification.of('Neighborhood is required.'),
            Notification.of('Zipcode is required.'),
            Notification.of('City is required.'),
            Notification.of('State is required.')
        ]

        const newCustomer = resultCustomer.entity()
        const newAddress =  Address.of('', '', '', '','', '', '')
        const receivedResult = newCustomer.changeAddress(newAddress)
        expect(receivedResult).toEqual(ResultCommand.of(expectedNotifications))
        expect(expectedAddress).toEqual(newCustomer.address)
    })

    it('should validate customer already registred', () => {
        const createCustomerSpecification: CreateCustomerSpecification = jest.createMockFromModule("./create.customer.specification")
        createCustomerSpecification.isSatisfied = jest.fn(customer => Notification.of('some message.'))

        const expectedFullName = FullName.of('John Will')
        const expectedEmail = Email.of('john@gmail.com')
        const expectedSsNumber = SSNumber.of('112121212')
        const expectedAddress =  Address.of('some address', '100', 'NA', 'some neigborhood','some city', 'CA', '10399-111')

        const resultCustomer = Customer.build({
            fullname : expectedFullName,
            email : expectedEmail,
            ssNumber : expectedSsNumber,
            address : expectedAddress,
            specification : createCustomerSpecification
        })

        const expectedNotifications = [
            Notification.of('some message.')
        ]
    
        expect(resultCustomer.notifications().filterNotificationsWithValue()).toEqual(expectedNotifications)
    })
})