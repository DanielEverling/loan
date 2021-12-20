import { Notification } from "./notification";

export interface ValidationAware {
    validators(): Array<Notification>
}