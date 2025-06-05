import { EventBase } from '../BaseEvent.js';


export class SignUpEvent extends EventBase {
  event_name = 'sign_up';
  constructor(params = {}) {
    super(params);
  }
}
