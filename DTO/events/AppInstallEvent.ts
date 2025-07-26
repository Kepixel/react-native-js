import { EventBase, EventBaseParams } from '../BaseEvent.js';

export interface AppInstallEventParams extends EventBaseParams {
  app_name?: string;
  app_version?: string;
}

export class AppInstallEvent extends EventBase {
  event_name = 'app_install';
  app_name?: string;
  app_version?: string;

  constructor(params: AppInstallEventParams = {}) {
    super(params);
    this.app_name = params.app_name;
    this.app_version = params.app_version;
  }
}
