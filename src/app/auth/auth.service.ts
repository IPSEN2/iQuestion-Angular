import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {UserModel} from "./user.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ErrorModel} from "../shared/error.model";

export interface AuthResponseData {
  token: string;
}

@Injectable({providedIn: "root"})
export class AuthService {
  user = new BehaviorSubject<UserModel | null>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('/auth/login',
        {
          email: email,
          password: password
        }
      )
      .pipe(catchError(this.handleError), tap(response => {
        console.log(response);
        this.handleAuthentication(response.token);
      }));
  }

  autoLogin() {
    const userData: { _token: string; } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(userData._token);
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }

  whoAmI() {
    return this.http.get('/auth/me');
  }

  private handleAuthentication(token: string) {
    const user = new UserModel(token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
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
