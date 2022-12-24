import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, tap} from "rxjs";
import {UserModel} from "./user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ErrorHandlingService} from "../shared/services/error-handling.service";
import { LocalUser } from "../shared/models/localUser.model";

export interface AuthResponseData {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = new BehaviorSubject<LocalUser | null>(null);

  constructor(private http: HttpClient, private router: Router, private errorHandlingService: ErrorHandlingService) {
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
      .post<AuthResponseData>('/auth/login',
        {
          email: email,
          password: password
        }
      )
    }

    const loadedUser = new LocalUser(userData._token);
    if (loadedUser.token) {
      this.user$.next(loadedUser);
    }
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }

  private handleAuthentication(token: string) {
    const user = new LocalUser(token);
    this.user$.next(user);
  }
