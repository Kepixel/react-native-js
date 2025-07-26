export interface UserDataParams {
    email?: string;
    phone?: string;
    name?: string;
    id?: string;
    [key: string]: any;
}
export declare class UserData {
    email?: string;
    phone?: string;
    name?: string;
    id?: string;
    [key: string]: any;
    constructor(params?: UserDataParams);
}
