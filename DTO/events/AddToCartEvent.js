import { EventBase } from '../BaseEvent.js';

export class AddToCartEvent extends EventBase {
  event_name = 'add_to_cart';

  constructor(params = {}) {
    super(params);
    this.value = params.value;
    this.currency = params.currency;
    this.items = params.items;
  }
}
