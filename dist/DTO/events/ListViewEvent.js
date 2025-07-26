import { EventBase } from '../BaseEvent.js';
export class ListViewEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'list_view';
        this.id = params.id;
        this.name = params.name;
        this.category = params.category;
        this.type = params.type;
    }
}
