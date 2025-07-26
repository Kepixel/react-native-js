import { EventBase, EventBaseParams } from '../BaseEvent.js';

export interface AppOpenEventParams extends EventBaseParams {
  app_name?: string;
  app_version?: string;
}

export class AppOpenEvent extends EventBase {
  event_name = 'app_open';
  app_name?: string;
  app_version?: string;

  constructor(params: AppOpenEventParams = {}) {
    super(params);
    this.app_name = params.app_name;
    this.app_version = params.app_version;
  }
}
