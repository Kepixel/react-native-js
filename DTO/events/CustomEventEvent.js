import { EventBase } from '../BaseEvent';

export class CustomEventEvent extends EventBase {
  event_name = 'custom_event';
  constructor(params = {}) {
    super(params);
  }
}
