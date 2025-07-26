export interface UserDataParams {
  email?: string;
  phone?: string;
  name?: string;
  id?: string;
  [key: string]: any;
}

export class UserData {
  email?: string;
  phone?: string;
  name?: string;
  id?: string;
  [key: string]: any;

  constructor(params: UserDataParams = {}) {
    this.email = params.email;
    this.phone = params.phone;
    this.name = params.name;
    this.id = params.id;
    Object.keys(params).forEach(key => {
      if (!(key in this)) {
        (this as any)[key] = params[key];
      }
    });
  }
}
