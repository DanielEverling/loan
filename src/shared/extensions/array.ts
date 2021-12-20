import { Notification } from "../domain/notification"
import "../extensions/string"

declare global {
    interface Array<T> {
        isEmpty(): boolean
        filterNotificationsWithValue() : Array<Notification>
    }
}

Array.prototype.isEmpty = function(): boolean {
    return this.length === 0;
}

Array.prototype.filterNotificationsWithValue = function(): Array<Notification> {
    return this.filter(e => {
        const element  = e as Notification
        if(!element.value.isBlank()) {
            return element
        }
    });
}