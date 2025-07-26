import { EventBase, EventBaseParams, Item } from '../BaseEvent.js';


export interface InitiateCheckoutEventParams extends EventBaseParams {
  value?: number;
  currency?: string;
  items?: Item[];
}

export class InitiateCheckoutEvent extends EventBase {
  event_name = 'initiate_checkout';
  value?: number;
  currency?: string;
  items?: Item[];

  constructor(params: InitiateCheckoutEventParams = {}) {
    super(params);
    this.value = params.value;
    this.currency = params.currency;
    this.items = params.items;
  }
}
