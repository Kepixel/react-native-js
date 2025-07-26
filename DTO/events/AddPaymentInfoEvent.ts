import { EventBase, EventBaseParams, Item } from '../BaseEvent.js';

export interface AddPaymentInfoEventParams extends EventBaseParams {
  value?: number;
  currency?: string;
  items?: Item[];
}

export class AddPaymentInfoEvent extends EventBase {
  event_name = 'add_payment_info';
  value?: number;
  currency?: string;
  items?: Item[];

  constructor(params: AddPaymentInfoEventParams = {}) {
    super(params);
    this.value = params.value;
    this.currency = params.currency;
    this.items = params.items;
  }
}
