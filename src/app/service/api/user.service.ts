import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient: HttpClient;

  constructor(private http: HttpClient) {
    this.httpClient = http;
  }

  getMe(): Observable<User> {
    return this.http.get<User>('/user/me');
  }
}
