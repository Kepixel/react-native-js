import { EventBase } from '../BaseEvent.js';

export class CustomEventEvent extends EventBase {
  event_name = 'custom_event';
  constructor(params = {}) {
    super(params);
  }
}
