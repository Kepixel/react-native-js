import { EventBase, EventBaseParams } from '../BaseEvent.js';
export interface DownloadEventParams extends EventBaseParams {
    content_type?: string;
    content_id?: string;
}
export declare class DownloadEvent extends EventBase {
    event_name: string;
    content_type?: string;
    content_id?: string;
    constructor(params?: DownloadEventParams);
}
