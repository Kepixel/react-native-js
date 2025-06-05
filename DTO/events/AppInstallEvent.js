import { EventBase } from '../BaseEvent.js';

export class AppInstallEvent extends EventBase {
  event_name = 'app_install';
  constructor(params = {}) {
    super(params);
  }
}
