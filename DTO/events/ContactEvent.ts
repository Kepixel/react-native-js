import { EventBase, EventBaseParams } from '../BaseEvent.js';

export interface ContactEventParams extends EventBaseParams {
  method?: string;
}

export class ContactEvent extends EventBase {
  event_name = 'contact';
  method?: string;

  constructor(params: ContactEventParams = {}) {
    super(params);
    this.method = params.method;
  }
}
