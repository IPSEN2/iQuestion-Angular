import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {User} from "../../shared/models/user.model";
import {ErrorHandlingService} from "../../shared/services/error-handling.service";


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('/user/all')
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  get(id: string): Observable<User> {
    return this.http.get<User>('/user/' + id)
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  disableUser(id: string | undefined) {
    return this.http.post('/user/' + id, {
      enabled: 'false'
    }).pipe(catchError(this.errorHandlingService.handleError));
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post('/auth/change-password', {token: token, newPassword: newPassword})
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  requestPasswordReset(email: string) {
    return this.http.post('/auth/request-password-reset', {email: email})
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  createUser(name: null | undefined, email: null | undefined, organization: null | undefined, role: null | undefined) {
    return this.http.post('/auth/register/', {
      name: name,
      email: email,
      organization: organization,
      role: role
    }).pipe(catchError(this.errorHandlingService.handleError));
  };

  updateUser(user: User, name: null | undefined, organization: null | undefined, role: null | undefined, enabled: null | undefined) {
    return this.http.post('/user/' + user.id, {
      name: name,
      organization: organization,
      role: role,
      enabled: enabled
    }).pipe(catchError(this.errorHandlingService.handleError));
  }
}
