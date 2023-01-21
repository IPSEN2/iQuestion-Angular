import {Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDeleteComponent} from "../user-delete/user-delete.component";
import {UserService} from "../../service/api/user.service";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-userOverview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent {
  users: User[] = [];
  public searchString: any;

  constructor(public modalService: NgbModal,
              public userService: UserService) {
    this.userService.getAll().subscribe((users) => (this.users = users));
  }

  showDeleteModal(clickedUser: User) {
    const modalRef = this.modalService.open(UserDeleteComponent);
    modalRef.componentInstance.user = clickedUser;
  }

  userRoleToText(userRole: string) {
    if (userRole == "SPINE_ADMIN") return "Spine Administrator"
    if (userRole == "SPINE_USER") return "Spine Gebruiker"
    if (userRole == "CAREGIVER") return "Hulpverlener"
    return "Onbekende Rol"
  }
}
