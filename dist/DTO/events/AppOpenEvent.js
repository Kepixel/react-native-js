import { EventBase } from '../BaseEvent.js';
export class AppOpenEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'app_open';
        this.app_name = params.app_name;
        this.app_version = params.app_version;
    }
}
