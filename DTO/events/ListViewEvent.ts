import { EventBase, EventBaseParams } from '../BaseEvent.js';

export interface ListViewEventParams extends EventBaseParams {
  id?: string | number;
  name?: string;
  category?: string;
  type?: string;
}

export class ListViewEvent extends EventBase {
  event_name = 'list_view';
  id?: string | number;
  name?: string;
  category?: string;
  type?: string;

  constructor(params: ListViewEventParams = {}) {
    super(params);
    this.id = params.id;
    this.name = params.name;
    this.category = params.category;
    this.type = params.type;
  }
}
