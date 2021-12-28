import { Aggregate } from "./aggregate";
import { Notification } from "./notification";
import { Specification } from "./specification";

export class DefaultSpecification<T extends Aggregate> implements Specification<T> {

    private constructor() {}

    public static of<T extends Aggregate>(): Specification<T> {
        return new DefaultSpecification<T>();
    }

    isSatisfied(aggregate: T) : Notification {
        return Notification.empty()
    }
    
}