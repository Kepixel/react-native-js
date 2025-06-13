import { EventBase } from '../BaseEvent';

export class ListViewEvent extends EventBase {
  event_name = 'list_view';
  constructor(params = {}) {
    super(params);
    this.id = params.id;
    this.name = params.name;
    this.category = params.category;
    this.type = params.type;
  }
}
