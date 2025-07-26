import { EventBase } from '../BaseEvent.js';
export class LoginEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'login';
    }
}
