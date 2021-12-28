import { EventEmitter2 } from "@nestjs/event-emitter";
import { Event } from "./event";

export class EventPublisher {

    constructor(private eventEmitter: EventEmitter2) {}
    
    publish(event: Event) {
        this.eventEmitter.emit(event.name, event.payload)
    }
}