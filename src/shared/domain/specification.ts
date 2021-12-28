import { Aggregate } from "./aggregate";
import { Notification } from "./notification";

export interface Specification<T extends Aggregate> {

    isSatisfied(aggregate: T) : Notification

}