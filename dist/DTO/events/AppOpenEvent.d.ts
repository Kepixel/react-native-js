import { EventBase, EventBaseParams } from '../BaseEvent.js';
export interface AppOpenEventParams extends EventBaseParams {
    app_name?: string;
    app_version?: string;
}
export declare class AppOpenEvent extends EventBase {
    event_name: string;
    app_name?: string;
    app_version?: string;
    constructor(params?: AppOpenEventParams);
}
