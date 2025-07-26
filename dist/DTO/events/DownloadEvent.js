import { EventBase } from '../BaseEvent.js';
export class DownloadEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'download';
        this.content_type = params.content_type;
        this.content_id = params.content_id;
    }
}
