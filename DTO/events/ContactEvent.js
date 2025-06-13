import { EventBase } from '../BaseEvent';

export class ContactEvent extends EventBase {
  event_name = 'contact';
  constructor(params = {}) {
    super(params);
  }
}
