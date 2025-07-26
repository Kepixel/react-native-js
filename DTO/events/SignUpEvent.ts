import { EventBase, EventBaseParams } from '../BaseEvent.js';


export interface SignUpEventParams extends EventBaseParams {}

export class SignUpEvent extends EventBase {
  event_name = 'sign_up';

  constructor(params: SignUpEventParams = {}) {
    super(params);
  }
}
