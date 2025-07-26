import { EventBase, EventBaseParams, Item } from '../BaseEvent.js';
export interface InitiateCheckoutEventParams extends EventBaseParams {
    value?: number;
    currency?: string;
    items?: Item[];
}
export declare class InitiateCheckoutEvent extends EventBase {
    event_name: string;
    value?: number;
    currency?: string;
    items?: Item[];
    constructor(params?: InitiateCheckoutEventParams);
}
