import { EventBase } from '../BaseEvent';


export class LoginEvent extends EventBase {
  event_name = 'login';
  constructor(params = {}) {
    super(params);
  }
}
