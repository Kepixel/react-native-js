import { EventBase, EventBaseParams } from '../BaseEvent.js';
export interface ListViewEventParams extends EventBaseParams {
    id?: string | number;
    name?: string;
    category?: string;
    type?: string;
}
export declare class ListViewEvent extends EventBase {
    event_name: string;
    id?: string | number;
    name?: string;
    category?: string;
    type?: string;
    constructor(params?: ListViewEventParams);
}
