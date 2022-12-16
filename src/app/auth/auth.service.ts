import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, tap} from "rxjs";
import {UserModel} from "./user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ErrorHandlingService} from "../shared/services/error-handling.service";

export interface AuthResponseData {
  token: string;
}

@Injectable({providedIn: "root"})
export class AuthService {
  user = new BehaviorSubject<UserModel | null>(null);

  constructor(private http: HttpClient, private router: Router, private errorHandlingService: ErrorHandlingService) {
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('/auth/login',
        {
          email: email,
          password: password
        }
      )
      .pipe(catchError(this.errorHandlingService.handleError), tap(response => {
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
    this.http.get('/auth/me')
      .subscribe(response => {
        return response
      });
  }

  private handleAuthentication(token: string) {
    const user = new UserModel(token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
