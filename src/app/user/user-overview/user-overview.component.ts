import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDeleteComponent} from "../user-delete/user-delete.component";
import {UserService} from "../../service/api/user.service";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-userOverview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent{
  users: User[] = [];

  constructor(private http: HttpClient,
              public modalService: NgbModal,
              public userService: UserService) {
    this.userService.getAll().subscribe((users) => (this.users = users));
  }

  showDeleteModal(clickedUser: User){
    const modalRef = this.modalService.open(UserDeleteComponent);
    modalRef.componentInstance.user = clickedUser;
  }

}
