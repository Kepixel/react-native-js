import { EventBase, EventBaseParams } from '../BaseEvent.js';
export interface ViewContentEventParams extends EventBaseParams {
    id?: string | number;
    name?: string;
    currency?: string;
    type?: string;
    value?: number;
}
export declare class ViewContentEvent extends EventBase {
    event_name: string;
    id?: string | number;
    name?: string;
    currency?: string;
    type?: string;
    value?: number;
    constructor(params?: ViewContentEventParams);
}
