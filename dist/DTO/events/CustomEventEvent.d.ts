import { EventBase, EventBaseParams } from '../BaseEvent.js';
export interface CustomEventEventParams extends EventBaseParams {
    event_name: string;
    [key: string]: any;
}
export declare class CustomEventEvent extends EventBase {
    event_name: string;
    constructor(params: CustomEventEventParams);
}
