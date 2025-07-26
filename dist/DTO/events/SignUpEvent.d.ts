import { EventBase, EventBaseParams } from '../BaseEvent.js';
export interface SignUpEventParams extends EventBaseParams {
}
export declare class SignUpEvent extends EventBase {
    event_name: string;
    constructor(params?: SignUpEventParams);
}
