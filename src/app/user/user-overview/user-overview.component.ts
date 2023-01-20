import {Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDeleteComponent} from "../user-delete/user-delete.component";
import {UserService} from "../../service/api/user.service";
import {User} from "../../shared/models/user.model";
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
              private toastService: ToastService
  ) {
    this.userService.getAll().subscribe({
        next: users => {
          this.users = users;
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

  showDeleteModal(clickedUser: User) {
    const modalRef = this.modalService.open(UserDeleteComponent);
    modalRef.componentInstance.user = clickedUser;
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

  userRoleToText(userRole: string) {
    if (userRole == "SPINE_ADMIN") return "Spine Administrator"
    if (userRole == "SPINE_USER") return "Spine Gebruiker"
    if (userRole == "CAREGIVER") return "Hulpverlener"
    return "Onbekende Rol"
  }
}
