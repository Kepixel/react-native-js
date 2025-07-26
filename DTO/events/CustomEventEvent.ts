import { EventBase, EventBaseParams } from '../BaseEvent.js';

export interface CustomEventEventParams extends EventBaseParams {
  event_name: string;
  [key: string]: any;
}

export class CustomEventEvent extends EventBase {
  event_name = 'custom_event';

  constructor(params: CustomEventEventParams) {
    super(params);
    this.event_name = params.event_name;
    Object.assign(this, params);
  }
}
