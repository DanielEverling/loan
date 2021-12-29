
import "../../extensions/string"
import "../../extensions/array"
import { SSNumber } from "./ssnumber"
import { Notification } from "../notification"

describe('Should testing ss number', () => { 

    it('should create a valid ss number', () => {
        const ssNumber = SSNumber.of('123131231')
        const receivedNotification = ssNumber.validators()
        const expectedNotification = []

        expect(receivedNotification.filterNotificationsWithValue()).toEqual(expectedNotification)
        expect(ssNumber.valueWithMask).toEqual('123-13-1231')
    })

    it('should validate ss number with empty value', () => {
        const ssNumber = SSNumber.of('')
        const receivedNotification = ssNumber.validators()
        const expectedNotification = [Notification.of('SS Number should have 9 characters.')]

        expect(receivedNotification.filterNotificationsWithValue()).toEqual(expectedNotification)
    })

    it('should validate ss number with not valid format', () => {
        const ssNumber = SSNumber.of('1233')
        const receivedNotification = ssNumber.validators()
        const expectedNotification = [Notification.of('SS Number should have 9 characters.')]

        expect(receivedNotification.filterNotificationsWithValue()).toEqual(expectedNotification)
    })

})