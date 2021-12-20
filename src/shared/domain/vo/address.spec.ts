import { Address } from "./address";
import "../../extensions/array"
import { Notification } from "../notification";

describe('Should validate address ', () => { 

    it('should create a valid address', () => {
        const expectedStreet =  'some address'
        const expectedNumber = '233'
        const expectedComplement = 'NA'
        const expectedNeighborhood = 'some neigborhood'
        const expectedCity = 'some city'
        const expectedState = 'CA'
        const expectedZipcode ='10399-111'

        const address = Address.of(expectedStreet, 
            expectedNumber,
            expectedComplement,
            expectedNeighborhood,
            expectedCity,
            expectedState,
            expectedZipcode)
        
        const expectedNotifications = []
        expect(address.validators().filterNotificationsWithValue()).toEqual(expectedNotifications)
        expect(address.street).toEqual(expectedStreet)
        expect(address.number).toEqual(expectedNumber)
        expect(address.complement).toEqual(expectedComplement)
        expect(address.neighborhood).toEqual(expectedNeighborhood)
        expect(address.city).toEqual(expectedCity)
        expect(address.state).toEqual(expectedState)
        expect(address.zipcode).toEqual(expectedZipcode)
    })

    it('should validate address with empty fields', () => {
        const emptyValue = ''

        const address = Address.of(emptyValue, 
            emptyValue,
            emptyValue,
            emptyValue,
            emptyValue,
            emptyValue,
            emptyValue)
        
        const expectedNotifications = [
            Notification.of('Street is required.'),
            Notification.of('Neighborhood is required.'),
            Notification.of('Zipcode is required.'),
            Notification.of('City is required.'),
            Notification.of('State is required.')
        ]

        expect(address.validators().filterNotificationsWithValue()).toEqual(expectedNotifications)
    })

    it('should validate address with not valid fields', () => {
        const notValidValue = ''.generate(300)

        const address = Address.of(notValidValue, 
            notValidValue,
            notValidValue,
            notValidValue,
            notValidValue,
            notValidValue,
            notValidValue)
        
        const expectedNotifications = [
            Notification.of('Street should be less than 100 characters.'),
            Notification.of('Number should be less than 6 characters.'),
            Notification.of('Neighborhood should be less than 50 characters.'),
            Notification.of('Zipcode is required.'),
            Notification.of('City should be less than 50 characters.'),
            Notification.of('State should be less than 2 characters.'),
            Notification.of('Complement should be less than 100 characters.')
        ]
        
        expect(address.validators().filterNotificationsWithValue()).toEqual(expectedNotifications)
    })
})