export class UserData {
  constructor(params = {}) {
    this.email = params.email;
    this.phone = params.phone;
    this.name = params.name;
    this.id = params.id;
    Object.keys(params).forEach(key => {
      if (!(key in this)) {
        this[key] = params[key];
      }
    });
  }
}
