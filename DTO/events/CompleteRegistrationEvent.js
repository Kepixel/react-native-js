import { EventBase } from '../BaseEvent.js';

export class CompleteRegistrationEvent extends EventBase {
  event_name = 'complete_registration';
  constructor(params = {}) {
    super(params);
  }
}
