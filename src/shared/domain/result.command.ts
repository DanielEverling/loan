import { Notification } from "./notification";

export class ResultCommand {

    private constructor(readonly notifications: Notification[]) {}

    public static of(notifications: Notification[]): ResultCommand {
        return new ResultCommand(notifications)
    }

    public static empty(): ResultCommand {
        return new ResultCommand([])
    }

    public isSuccess() : boolean {
        return this.notifications.isEmpty()
    }

}