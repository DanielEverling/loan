import { Notification } from "./notification";

export class ResultCommand {

    private constructor(private readonly notifications: Notification[]) {

    }

    public static of(notifications: Notification[]): ResultCommand {
        return new ResultCommand(notifications)
    }

    public static empty(): ResultCommand {
        return new ResultCommand([])
    }

    public proccess(success: () => void, fail: () => void) {
        if (this.notifications.isEmpty()) {
            success()
        } else {
            fail()
        }
    }
}