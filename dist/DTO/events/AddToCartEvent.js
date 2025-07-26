import { EventBase } from '../BaseEvent.js';
export class AddToCartEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'add_to_cart';
        this.value = params.value;
        this.currency = params.currency;
        this.items = params.items;
    }
}
