import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorModel } from '../shared/error.model';
import { LocalUser } from '../shared/models/localUser.model';
import { UserService } from '../service/api/user.service';

export interface AuthResponseData {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = new BehaviorSubject<LocalUser | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.user$.subscribe((user) => {
      // check if user is logged in
      if (user && !user.user) {
        this.userService.getMe().subscribe((userDetails) => {
          user.user = userDetails;
          this.user$.next(user);
        });
      }
      localStorage.setItem('userData', JSON.stringify(user));
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('/auth/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(response.token);
        })
      );
  }

  autoLogin() {
    const userData: { _token: string } = JSON.parse(
      localStorage.getItem('userData') || '{}'
    );
    if (!userData) {
      return;
    }

    const loadedUser = new LocalUser(userData._token);
    if (loadedUser.token) {
      this.user$.next(loadedUser);
    }
  }

  logout() {
    this.user$.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }

  private handleAuthentication(token: string) {
    const user = new LocalUser(token);
    this.user$.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(() => errorMessage);
    }

    for (const [key, value] of ErrorModel.errorMap) {
      if (errorRes.error.message === key) {
        errorMessage = value;
        break;
      }
    }
    return throwError(() => errorMessage);
  }

}