import { EventBase, EventBaseParams } from '../BaseEvent.js';
export interface LoginEventParams extends EventBaseParams {
}
export declare class LoginEvent extends EventBase {
    event_name: string;
    constructor(params?: LoginEventParams);
}
