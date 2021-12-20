import { Notification } from "../domain/notification"
import "../extensions/array"

describe('Should testing array extensions', () => {

    it('Should filter and remove empty notifications', () => {
        const nofitications = [
            Notification.empty(),
            Notification.of('some notification'),
            Notification.empty(),
            Notification.of('some notification'),
            Notification.empty()
        ]

        const expectedNotification = [Notification.of('some notification'), 
            Notification.of('some notification')
        ]

        expect(expectedNotification).toEqual(nofitications.filterNotificationsWithValue())
    })
    
})