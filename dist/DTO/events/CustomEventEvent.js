import { EventBase } from '../BaseEvent.js';
export class CustomEventEvent extends EventBase {
    constructor(params) {
        super(params);
        this.event_name = 'custom_event';
        this.event_name = params.event_name;
        Object.assign(this, params);
    }
}
