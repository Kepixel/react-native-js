import { EventBase } from '../BaseEvent.js';


export class LoginEvent extends EventBase {
  event_name = 'login';
  constructor(params = {}) {
    super(params);
  }
}
