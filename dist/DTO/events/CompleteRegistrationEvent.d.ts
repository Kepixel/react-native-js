import { EventBase, EventBaseParams } from '../BaseEvent.js';
export interface CompleteRegistrationEventParams extends EventBaseParams {
    value?: number;
    currency?: string;
    method?: string;
}
export declare class CompleteRegistrationEvent extends EventBase {
    event_name: string;
    value?: number;
    currency?: string;
    method?: string;
    constructor(params?: CompleteRegistrationEventParams);
}
