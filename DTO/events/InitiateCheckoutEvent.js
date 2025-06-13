import { EventBase } from '../BaseEvent';


export class InitiateCheckoutEvent extends EventBase {
  event_name = 'initiate_checkout';
  constructor(params = {}) {
    super(params);
    this.value = params.value;
    this.currency = params.currency;
    this.items = params.items;
  }
}
