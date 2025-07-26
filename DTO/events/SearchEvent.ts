import { EventBase, EventBaseParams } from '../BaseEvent.js';


export interface SearchEventParams extends EventBaseParams {
  search_string?: string;
}

export class SearchEvent extends EventBase {
  event_name = 'search';
  search_string?: string;

  constructor(params: SearchEventParams = {}) {
    super(params);
    this.search_string = params.search_string;
  }
}
