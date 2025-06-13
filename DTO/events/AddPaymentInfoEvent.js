import { EventBase } from '../BaseEvent';

export class AddPaymentInfoEvent extends EventBase {
  event_name = 'add_payment_info';

  constructor(params = {}) {
    super(params);
    this.value = params.value;
    this.currency = params.currency;
    this.items = params.items;
  }
}
