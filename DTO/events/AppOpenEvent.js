import { EventBase } from '../BaseEvent';

export class AppOpenEvent extends EventBase {
  event_name = 'app_open';
  constructor(params = {}) {
    super(params);
  }
}
