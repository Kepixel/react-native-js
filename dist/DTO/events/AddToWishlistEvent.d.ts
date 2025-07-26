import { EventBase, EventBaseParams, Item } from '../BaseEvent.js';
export interface AddToWishlistEventParams extends EventBaseParams {
    items?: Item[];
}
export declare class AddToWishlistEvent extends EventBase {
    event_name: string;
    items?: Item[];
    constructor(params?: AddToWishlistEventParams);
}
