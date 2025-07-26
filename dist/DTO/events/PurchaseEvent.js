import { EventBase } from '../BaseEvent.js';
export class PurchaseEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'purchase';
        this.value = params.value;
        this.currency = params.currency;
        this.items = params.items;
        this.order_id = params.order_id;
        this.description = params.description;
    }
}
