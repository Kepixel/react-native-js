import { EventBase, EventBaseParams, Item } from '../BaseEvent.js';
export interface AddPaymentInfoEventParams extends EventBaseParams {
    value?: number;
    currency?: string;
    items?: Item[];
}
export declare class AddPaymentInfoEvent extends EventBase {
    event_name: string;
    value?: number;
    currency?: string;
    items?: Item[];
    constructor(params?: AddPaymentInfoEventParams);
}
