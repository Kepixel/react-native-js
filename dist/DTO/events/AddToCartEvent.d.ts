import { EventBase, EventBaseParams, Item } from '../BaseEvent.js';
export interface AddToCartEventParams extends EventBaseParams {
    value?: number;
    currency?: string;
    items?: Item[];
}
export declare class AddToCartEvent extends EventBase {
    event_name: string;
    value?: number;
    currency?: string;
    items?: Item[];
    constructor(params?: AddToCartEventParams);
}
