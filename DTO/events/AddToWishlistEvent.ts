import { EventBase, EventBaseParams, Item } from '../BaseEvent.js';

export interface AddToWishlistEventParams extends EventBaseParams {
  items?: Item[];
}

export class AddToWishlistEvent extends EventBase {
  event_name = 'add_to_wishlist';
  items?: Item[];

  constructor(params: AddToWishlistEventParams = {}) {
    super(params);
    this.items = params.items;
  }
}
