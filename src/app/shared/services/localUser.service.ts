import {Injectable} from "@angular/core";
import {LocalUser} from "../models/localUser.model";

@Injectable({providedIn: "root"})
export class LocalUserService {
  private _loggedIn: boolean = false;
  private _localUser: LocalUser | undefined;

  get localUser(): LocalUser {
    return <LocalUser>this._localUser;
  }

  set localUser(value: LocalUser | undefined) {
    this._localUser = value;
  }

  get isLoggedIn(): boolean {
    return this._loggedIn;
  }

  set setLoggedIn(value: boolean) {
    this._loggedIn = value;
  }
}
