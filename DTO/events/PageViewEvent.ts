import { EventBase, EventBaseParams } from '../BaseEvent.js';


export interface PageViewEventParams extends EventBaseParams {
  id?: string | number;
  name?: string;
  category?: string;
  type?: string;
}

export class PageViewEvent extends EventBase {
  event_name = 'page_view';
  id?: string | number;
  name?: string;
  category?: string;
  type?: string;

  constructor(params: PageViewEventParams = {}) {
    super(params);
    this.id = params.id;
    this.name = params.name;
    this.category = params.category;
    this.type = params.type;
  }
}
