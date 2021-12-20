import { Notification } from "../domain/notification";
import '../extensions/string'

describe('Should testing string extensions', () => {

    it('should validate empty string', () => {
        const emptyString = ''
        const expectedNotification = Notification.of('Value is required.')
        const receivedNotification = emptyString.isEmpty('Value is required.')
        
        expect(receivedNotification).toEqual(expectedNotification)
    })

    it('should validate string with value', () => {
        const value = 'some value in string'
        const expectedNotification = Notification.empty()
        const receivedNotification = value.isEmpty('Value is required.')
        
        expect(receivedNotification).toEqual(expectedNotification)
    })

    it('should be true when string match with pattern', () => {
        const value = 'email@domain.com'
        const pattern = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
        const expectedNotification = Notification.empty()
        const receivedNotification = value.hasPattern(pattern, 'E-mail should be valid.')
        
        expect(receivedNotification).toEqual(expectedNotification)
    })

    it('should received notification when string is not match with pattern', () => {
        const value = 'not valid email'
        const pattern = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
        const expectedNotification = Notification.of('E-mail should be valid.')
        const receivedNotification = value.hasPattern(pattern, 'E-mail should be valid.')
        
        expect(receivedNotification).toEqual(expectedNotification)
    })

    it('should received emtpy notification when string has an valid length', () => {
        const value = 'an valid value'
        const receivedNotification = value.validateSizeLessThan(200, 'some message.')
        const expectedNotification = Notification.empty()
        expect(receivedNotification).toEqual(expectedNotification)
    })

    it('should received notification when string is more then valid length', () => {
        const value = 'an valid value'
        const receivedNotification = value.validateSizeLessThan(5, 'some message.')
        const expectedNotification = Notification.of('some message.')
        expect(receivedNotification).toEqual(expectedNotification)
    })

    it('should generate randon strings', () => {
        const receivedRandonString = ''.generate(200)
        expect(receivedRandonString.length).toEqual(200)
    })

    it('should validate exact size of string value', () => {
        const value = '01238119221'
        const receivedNotification = value.exactLengt(11, 'some message')
        const expectedNotification = Notification.empty()
        expect(receivedNotification).toEqual(expectedNotification)
    })

    it('should validate exact size of string value and return notification with value', () => {
        const value = '01238119221'
        const receivedNotification = value.exactLengt(15, 'some message')
        const expectedNotification = Notification.of('some message')
        expect(receivedNotification).toEqual(expectedNotification)
    })
})