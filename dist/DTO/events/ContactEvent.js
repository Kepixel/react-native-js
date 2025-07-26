import { EventBase } from '../BaseEvent.js';
export class ContactEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'contact';
        this.method = params.method;
    }
}
