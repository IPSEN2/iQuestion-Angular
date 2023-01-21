import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDeleteComponent} from "../user-delete/user-delete.component";
import {UserService} from "../../service/api/user.service";
import {User} from "../../shared/models/user.model";
import {TransformText} from "../../utility/transform.text";

@Component({
  selector: 'app-userOverview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent{
  users: User[] = [];
  public searchString: any;

  constructor(private http: HttpClient,
              public modalService: NgbModal,
              public userService: UserService,
              public transformText: TransformText) {
    this.userService.getAll().subscribe((users) => (
      this.fillUserArray(users)));
  }

  showDeleteModal(clickedUser: User){
    const modalRef = this.modalService.open(UserDeleteComponent);
    modalRef.componentInstance.user = clickedUser;
  }

  fillUserArray(users: User[]) {
    for (const user of users) {
      if (user.enabled) {
        this.users.push(user)
      }
    }
    for (const user of users) {
      if (!user.enabled){
        this.users.push(user)
      }
    }
  }

}
