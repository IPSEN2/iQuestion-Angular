import {User} from "./user.model";

export class LocalUser {
  user?: User;
  token: string;

  constructor(token: string, user?: User) {
    this.token = token;
    this.user = user;
  }
}
