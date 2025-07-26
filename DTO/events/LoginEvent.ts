import { EventBase, EventBaseParams } from '../BaseEvent.js';


export interface LoginEventParams extends EventBaseParams {}

export class LoginEvent extends EventBase {
  event_name = 'login';

  constructor(params: LoginEventParams = {}) {
    super(params);
  }
}
