import { EventBase } from '../BaseEvent';

export class AddToWishlistEvent extends EventBase {
  event_name = 'add_to_wishlist';
  constructor(params = {}) {
    super(params);
    this.items = params.items;
  }
}
