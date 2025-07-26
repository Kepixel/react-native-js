import { EventBase } from '../BaseEvent.js';
export class SignUpEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'sign_up';
    }
}
