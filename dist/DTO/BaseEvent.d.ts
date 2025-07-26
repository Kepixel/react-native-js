import { UserData, UserDataParams } from './UserData.js';
export interface EventBaseParams {
    source?: string;
    user_data?: UserData | UserDataParams;
    custom_data?: Record<string, any>;
}
export interface Item {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    category?: string;
    variant?: string;
    [key: string]: any;
}
export declare class EventBase {
    source?: string;
    user_data?: UserData;
    custom_data?: Record<string, any>;
    constructor(params?: EventBaseParams);
}
