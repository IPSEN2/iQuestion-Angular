import {Component, OnInit} from '@angular/core';
import { User} from "../user.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-userOverview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit{

  ngOnInit() {
    this.getUsers();
  }

  users: User[] = [];
  constructor(private http: HttpClient) {
  }

  getUsers(){
    this.http.get('/user/all')
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
        organization: data[i].organization,
        role: data[i].role
      });
    }

  }


}
