import { EventBase } from '../BaseEvent.js';
export class CompleteRegistrationEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'complete_registration';
        this.value = params.value;
        this.currency = params.currency;
        this.method = params.method;
    }
}
