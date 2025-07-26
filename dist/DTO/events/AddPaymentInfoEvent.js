import { EventBase } from '../BaseEvent.js';
export class AddPaymentInfoEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'add_payment_info';
        this.value = params.value;
        this.currency = params.currency;
        this.items = params.items;
    }
}
