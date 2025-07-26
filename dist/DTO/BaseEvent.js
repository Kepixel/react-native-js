import { UserData } from './UserData.js';
export class EventBase {
    constructor(params = {}) {
        this.source = params.source;
        if (params.user_data instanceof UserData) {
            this.user_data = params.user_data;
        }
        else if (params.user_data) {
            this.user_data = new UserData(params.user_data);
        }
        this.custom_data = params.custom_data;
    }
}
