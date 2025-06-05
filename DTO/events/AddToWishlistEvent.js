import { EventBase } from '../BaseEvent.js';

export class AddToWishlistEvent extends EventBase {
  event_name = 'add_to_wishlist';
  constructor(params = {}) {
    super(params);
    this.items = params.items;
  }
}
