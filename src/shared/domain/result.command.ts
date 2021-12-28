import { Notification } from "./notification";

export class ResultCommand {

    private constructor(readonly notifications: Notification[]) {}

    public static of(notifications: Notification[]): ResultCommand {
        return new ResultCommand(notifications)
    }

    public static empty(): ResultCommand {
        return new ResultCommand([])
    }

    public proccess(success: () => any | void, fail: () => Notification[] | void) {
        if (this.notifications.isEmpty()) {
            return success()
        } else {
            return fail()
        }
    }
}