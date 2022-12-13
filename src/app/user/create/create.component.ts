import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-userCreate',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  constructor(private http: HttpClient) {
  }

  createUser(){
    const headers = new HttpHeaders().set('content-type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIERldGFpbHMiLCJpc3MiOiJJLlF1ZXN0aW9uIiwiaWF0IjoxNjcwNzY4MjczLCJlbWFpbCI6InNwaW5lX2FkbWluQHRlc3QuY29tIn0.j4SBytNDMTXXyHimJFaFWwuM1VBTsqvnCBVV7cD4zuo');
    this.http.post('http://localhost:8080/auth/register/', {
      name: 'Luuk2',
      email: 'Luuk2@test.com',
      organisation: 'testcorp',
      role: 'SPINE_ADMIN',
    }, {headers: headers})
      .subscribe();
  }

}
