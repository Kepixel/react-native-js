import { EventBase } from '../BaseEvent';


export class SignUpEvent extends EventBase {
  event_name = 'sign_up';
  constructor(params = {}) {
    super(params);
  }
}
