import { Notification } from "../notification";
import '../../extensions/string'
import '../../extensions/array'
import { Email } from "./email";

describe('Should validate email ', () => {

    it('Should validate an valid email', () =>{
        const validEmail = 'value@domain.com'
        const email = Email.of(validEmail)
        const receivedNotification = email.validators()
        const expectedNotification = []

        expect(receivedNotification.filterNotificationsWithValue()).toEqual(expectedNotification)
        expect(validEmail).toEqual(email.value)
    })

    it('Should validate an not valid email', () =>{
        const validEmail = 'not valid email'
        const email = Email.of(validEmail)
        const receivedNotification = email.validators()
        const expectedNotification = [Notification.of('E-mail should be valid.')]

        expect(receivedNotification.filterNotificationsWithValue()).toEqual(expectedNotification)
    })
})