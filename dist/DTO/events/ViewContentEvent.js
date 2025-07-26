import { EventBase } from '../BaseEvent.js';
export class ViewContentEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'view_content';
        this.id = params.id;
        this.name = params.name;
        this.currency = params.currency;
        this.type = params.type;
        this.value = params.value;
    }
}
