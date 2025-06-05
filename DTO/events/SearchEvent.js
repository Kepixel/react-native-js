import { EventBase } from '../BaseEvent.js';


export class SearchEvent extends EventBase {
  event_name = 'search';
  constructor(params = {}) {
    super(params);
    this.search_string = params.search_string;
  }
}
