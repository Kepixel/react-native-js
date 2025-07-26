import { EventBase, EventBaseParams } from '../BaseEvent.js';
export interface ContactEventParams extends EventBaseParams {
    method?: string;
}
export declare class ContactEvent extends EventBase {
    event_name: string;
    method?: string;
    constructor(params?: ContactEventParams);
}
