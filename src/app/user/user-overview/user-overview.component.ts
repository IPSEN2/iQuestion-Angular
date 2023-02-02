import {Component, OnDestroy} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDisableComponent} from "../user-disable/user-disable.component";
import {UserService} from "../../service/api/user.service";
import {User} from "../../shared/models/user.model";
import {TransformText} from "../../utility/transform.text";
import {ToastService} from "../../shared/toast/toast-service";

@Component({
  selector: 'app-userOverview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnDestroy{
  users: User[] = [];
  public searchString: any;

  constructor(public modalService: NgbModal,
              public userService: UserService,
              public transformText: TransformText,
              private toastService: ToastService) {
    this.createUserTable()
  }

  showDisableModal(clickedUser: User) {
    const modalRef = this.modalService.open(UserDisableComponent);
    modalRef.componentInstance.user = clickedUser;
    modalRef.componentInstance.disableConfirmed.subscribe(
      (disableConfirmed: boolean) => {
        if (disableConfirmed) {
          this.createUserTable();
        }
      }
    );
  }

  createUserTable() {
    this.users = [];
    this.userService.getAll().subscribe({
        next: (users) => {
          this.fillUserArray(users);
        },
        error: errorMessage => {
          this.toastService.show(
            '❌ - ' + errorMessage,
            {classname: 'bg-danger text-light', delay: 5000}
          );
        }
      }
    );

  }

  fillUserArray(users: User[]) {
    for (const user of users) {
      if (user.enabled) {
        this.users.push(user)
      }
    }
    for (const user of users) {
      if (!user.enabled) {
        this.users.push(user)
      }
    }
  }

  ngOnDestroy() {
    this.toastService.clear();
  }
}
