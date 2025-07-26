import { EventBase } from '../BaseEvent.js';
export class SearchEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'search';
        this.search_string = params.search_string;
    }
}
