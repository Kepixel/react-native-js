import { EventBase, EventBaseParams } from '../BaseEvent.js';

export interface CompleteRegistrationEventParams extends EventBaseParams {
  value?: number;
  currency?: string;
  method?: string;
}

export class CompleteRegistrationEvent extends EventBase {
  event_name = 'complete_registration';
  value?: number;
  currency?: string;
  method?: string;

  constructor(params: CompleteRegistrationEventParams = {}) {
    super(params);
    this.value = params.value;
    this.currency = params.currency;
    this.method = params.method;
  }
}
