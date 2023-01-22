import {Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDisableComponent} from "../user-disable/user-disable.component";
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

  constructor(public modalService: NgbModal,
              public userService: UserService,
              public transformText: TransformText) {
    this.userService.getAll().subscribe((users) => (
      this.fillUserArray(users)));
  }

  showDisableModal(clickedUser: User){
    const modalRef = this.modalService.open(UserDisableComponent);
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
