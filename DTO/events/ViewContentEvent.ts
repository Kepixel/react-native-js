import { EventBase, EventBaseParams } from '../BaseEvent.js';

export interface ViewContentEventParams extends EventBaseParams {
  id?: string | number;
  name?: string;
  currency?: string;
  type?: string;
  value?: number;
}

export class ViewContentEvent extends EventBase {
  event_name = 'view_content';
  id?: string | number;
  name?: string;
  currency?: string;
  type?: string;
  value?: number;

  constructor(params: ViewContentEventParams = {}) {
    super(params);
    this.id = params.id;
    this.name = params.name;
    this.currency = params.currency;
    this.type = params.type;
    this.value = params.value;
  }
}
