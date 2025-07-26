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

export class EventBase {
  source?: string;
  user_data?: UserData;
  custom_data?: Record<string, any>;

  constructor(params: EventBaseParams = {}) {
    this.source = params.source;
    if (params.user_data instanceof UserData) {
      this.user_data = params.user_data;
    } else if (params.user_data) {
      this.user_data = new UserData(params.user_data);
    }
    this.custom_data = params.custom_data;
  }
}
