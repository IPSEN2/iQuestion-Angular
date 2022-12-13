import {Component, OnInit} from '@angular/core';
import { User} from "../user.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-userOverview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit{

  ngOnInit() {
    this.getUsers();
  }

  users: User[] = [];
  constructor(private http: HttpClient) {
  }

  getUsers(){
    const headers = new HttpHeaders().set('content-type', 'application/json')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIERldGFpbHMiLCJpc3MiOiJJLlF1ZXN0aW9uIiwiaWF0IjoxNjcwNzY4MjczLCJlbWFpbCI6InNwaW5lX2FkbWluQHRlc3QuY29tIn0.j4SBytNDMTXXyHimJFaFWwuM1VBTsqvnCBVV7cD4zuo');
    this.http.get('http://localhost:8080/user/all', {headers: headers})
      .subscribe((data: Object) => {
        this.fillUsers(data);
      });
  }

  fillUsers(data: any){
    for(let i = 0; i < data.length; i++){
      this.users.push({
        id: data[i].id,
        email: data[i].email,
        name: data[i].name,
        organisation: data[i].organisation,
        role: data[i].role
      });
    }

  }


}
