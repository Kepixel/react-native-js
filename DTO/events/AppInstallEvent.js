import { EventBase } from '../BaseEvent';

export class AppInstallEvent extends EventBase {
  event_name = 'app_install';
  constructor(params = {}) {
    super(params);
  }
}
