import { EventBase } from '../BaseEvent.js';
export class InitiateCheckoutEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'initiate_checkout';
        this.value = params.value;
        this.currency = params.currency;
        this.items = params.items;
    }
}
