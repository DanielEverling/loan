import { Notification } from "../notification"
import '../../extensions/string'
import '../../extensions/array'
import { FullName } from "./fullname"

describe('Should testing full name', () => {

    it('should create an valid full name', () => {
        const fullName = FullName.of('John Smitt')
        const expectedNotification = []
        const receivedNotification = fullName.validators()

        expect(receivedNotification.filterNotificationsWithValue()).toEqual(expectedNotification)
        expect('John Smitt').toEqual(fullName.value)
    })

    it('should validate full name is empty', () => {
        const fullName = FullName.of('')
        const expectedNotification = [Notification.of('Name is required.')]
        const receivedNotification = fullName.validators()

        expect(receivedNotification.filterNotificationsWithValue()).toEqual(expectedNotification)
    })

    it('should validate full name when is more then allowed lenght', () => {
        const fullName = FullName.of(''.generate(200))
        const expectedNotification = [Notification.of('Name should be less than 100 characters.')]
        const receivedNotification = fullName.validators()

        expect(receivedNotification.filterNotificationsWithValue()).toEqual(expectedNotification)
    })

})