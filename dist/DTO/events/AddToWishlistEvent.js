import { EventBase } from '../BaseEvent.js';
export class AddToWishlistEvent extends EventBase {
    constructor(params = {}) {
        super(params);
        this.event_name = 'add_to_wishlist';
        this.items = params.items;
    }
}
