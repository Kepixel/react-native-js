import { EventBase, EventBaseParams } from '../BaseEvent.js';
export interface AppInstallEventParams extends EventBaseParams {
    app_name?: string;
    app_version?: string;
}
export declare class AppInstallEvent extends EventBase {
    event_name: string;
    app_name?: string;
    app_version?: string;
    constructor(params?: AppInstallEventParams);
}
