import { EventBase } from '../BaseEvent.js';

export class ContactEvent extends EventBase {
  event_name = 'contact';
  constructor(params = {}) {
    super(params);
  }
}
