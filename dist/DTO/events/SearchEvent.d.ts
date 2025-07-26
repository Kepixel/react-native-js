import { EventBase, EventBaseParams } from '../BaseEvent.js';
export interface SearchEventParams extends EventBaseParams {
    search_string?: string;
}
export declare class SearchEvent extends EventBase {
    event_name: string;
    search_string?: string;
    constructor(params?: SearchEventParams);
}
