import {Component, OnInit} from '@angular/core';
import { User} from "../user.component";
import {HttpClient} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDeleteComponent} from "../user-delete/user-delete.component";

@Component({
  selector: 'app-userOverview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit{

  users: User[] = [];

  constructor(private http: HttpClient, public modalService: NgbModal) {
  }

  ngOnInit() {
    this.getUsers();
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

  showDeleteModal(clickedUser: User){
    const modalRef = this.modalService.open(UserDeleteComponent);
    modalRef.componentInstance.user = clickedUser;
    console.log(clickedUser);
  }

}
