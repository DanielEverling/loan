import { CreatedCustomerEvent } from "@base/shared/events/schema/created.customer.event";
import { OnEvent } from '@nestjs/event-emitter';

export class CreatedCustomerEventHandler {

    @OnEvent(CreatedCustomerEvent.EVENT_NAME)
    handler(event: CreatedCustomerEvent) {
        // make integration with auth server for example Okta, KeyCloak, Auth0
        console.log(event.payload)
    }

}