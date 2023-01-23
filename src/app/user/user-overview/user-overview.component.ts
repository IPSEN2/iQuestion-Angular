import {Component} from '@angular/core';
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
export class UserOverviewComponent {
  users: User[] = [];
  public searchString: any;

  constructor(public modalService: NgbModal,
              public userService: UserService,
              public transformText: TransformText) {
    this.createUserTable()
  }

  showDisableModal(clickedUser: User){
    const modalRef = this.modalService.open(UserDisableComponent);
    modalRef.componentInstance.user = clickedUser;
    modalRef.componentInstance.disableConfirmed.subscribe(
      (disableConfirmed: boolean) => {
        if(disableConfirmed){
            this.createUserTable();
        }
      }
    )
    modalRef.componentInstance.deleteConfirmed.subscribe(
      (deleteConfirmed: boolean) => {
        if (deleteConfirmed) {
          this.toastService.show('⚙️ - Bezig met verwijderen', {
            classname: 'bg-info text-light',
            delay: 3000,
          });
          this.userService.delete(clickedUser.id).subscribe({
            next: () => {
              this.toastService.show('✅ - Successvol verwijderd!', {
                  classname: 'bg-success text-light',
                  delay: 5000
                }
              );
            },
            error: errorMessage => {
              this.toastService.show(
                '❌ - ' + errorMessage,
                {classname: 'bg-danger text-light', delay: 5000}
              );
            }
          });
        }
      }
    )
  }

  createUserTable(){
    this.users = [];
    this.userService.getAll().subscribe((users) => (
      this.fillUserArray(users)));
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
