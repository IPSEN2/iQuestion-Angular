import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalUser} from '../shared/models/localUser.model';
import {LocalUserService} from "../shared/services/localUser.service";
import {ErrorHandlingService} from "../shared/services/error-handling.service";

export interface IAuthResponseData {
  token: string;
  user: {
    email: string,
    id: string,
    name: string
    organization: string
    role: string
  }
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localUserService: LocalUserService,
    private errorHandlingService: ErrorHandlingService
  ) {
  }

  login(email: string, password: string, rememberMe: boolean) {
    return this.http
      .post<IAuthResponseData>('/auth/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.errorHandlingService.handleError),
        tap((response) => {
          this.handleAuthentication(response, rememberMe);
        })
      );
  }

  autoLogin() {
    let userData;

    if (localStorage.getItem('userData') !== null) {
      userData = JSON.parse(localStorage.getItem('userData') || '{}');
    } else if (sessionStorage.getItem('userData') !== null) {
      userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    } else {
      return;
    }

    this.localUserService.setLoggedIn = true;
    this.localUserService.localUser = userData;
  }

  logout() {
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    this.localUserService.localUser = undefined;
    this.localUserService.setLoggedIn = false;
    this.router.navigate(['/login']);
  }

  private handleAuthentication(response: IAuthResponseData, rememberMe: boolean) {
    if (!response.token) {
      return;
    }

    const localUser = new LocalUser(response.token, response.user);

    if (rememberMe) {
      localStorage.setItem('userData', JSON.stringify(localUser));
    } else {
      sessionStorage.setItem('userData', JSON.stringify(localUser));
    }

    this.localUserService.setLoggedIn = true;
    this.localUserService.localUser = localUser;
  }
}
