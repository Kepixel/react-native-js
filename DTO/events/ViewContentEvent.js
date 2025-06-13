import { EventBase } from '../BaseEvent';

export class ViewContentEvent extends EventBase {
  event_name = 'view_content';
  constructor(params = {}) {
    super(params);
    this.id = params.id;
    this.name = params.name;
    this.currency = params.currency;
    this.type = params.type;
    this.value = params.value;
  }
}
