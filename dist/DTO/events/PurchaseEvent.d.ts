import { EventBase, EventBaseParams, Item } from '../BaseEvent.js';
export interface PurchaseEventParams extends EventBaseParams {
    value?: number;
    currency?: string;
    items?: Item[];
    order_id?: string;
    description?: string;
}
export declare class PurchaseEvent extends EventBase {
    event_name: string;
    value?: number;
    currency?: string;
    items?: Item[];
    order_id?: string;
    description?: string;
    constructor(params?: PurchaseEventParams);
}
