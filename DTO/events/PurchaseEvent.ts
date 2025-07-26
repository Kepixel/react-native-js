import { EventBase, EventBaseParams, Item } from '../BaseEvent.js';


export interface PurchaseEventParams extends EventBaseParams {
  value?: number;
  currency?: string;
  items?: Item[];
  order_id?: string;
  description?: string;
}

export class PurchaseEvent extends EventBase {
  event_name = 'purchase';
  value?: number;
  currency?: string;
  items?: Item[];
  order_id?: string;
  description?: string;

  constructor(params: PurchaseEventParams = {}) {
    super(params);
    this.value = params.value;
    this.currency = params.currency;
    this.items = params.items;
    this.order_id = params.order_id;
    this.description = params.description;
  }
}
