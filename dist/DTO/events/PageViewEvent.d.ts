import { EventBase, EventBaseParams } from '../BaseEvent.js';
export interface PageViewEventParams extends EventBaseParams {
    id?: string | number;
    name?: string;
    category?: string;
    type?: string;
}
export declare class PageViewEvent extends EventBase {
    event_name: string;
    id?: string | number;
    name?: string;
    category?: string;
    type?: string;
    constructor(params?: PageViewEventParams);
}
