import { EventBase, EventBaseParams, Item } from '../BaseEvent.js';

export interface AddToCartEventParams extends EventBaseParams {
  value?: number;
  currency?: string;
  items?: Item[];
}

export class AddToCartEvent extends EventBase {
  event_name = 'add_to_cart';
  value?: number;
  currency?: string;
  items?: Item[];

  constructor(params: AddToCartEventParams = {}) {
    super(params);
    this.value = params.value;
    this.currency = params.currency;
    this.items = params.items;
  }
}
