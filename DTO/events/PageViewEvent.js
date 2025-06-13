import { EventBase } from '../BaseEvent';


export class PageViewEvent extends EventBase {
  event_name = 'page_view';
  constructor(params = {}) {
    super(params);
    this.id = params.id;
    this.name = params.name;
    this.category = params.category;
    this.type = params.type;
  }
}
