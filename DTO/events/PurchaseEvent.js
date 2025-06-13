import { EventBase } from '../BaseEvent';


export class PurchaseEvent extends EventBase {
  event_name = 'purchase';
  constructor(params = {}) {
    super(params);
    this.value = params.value;
    this.currency = params.currency;
    this.items = params.items;
    this.order_id = params.order_id;
    this.description = params.description;
  }
}
