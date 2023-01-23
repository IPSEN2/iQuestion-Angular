import {Component, OnDestroy} from '@angular/core';
import {User} from "../../shared/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../shared/toast/toast-service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../service/api/user.service";


@Component({
  selector: 'app-userEdit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnDestroy {
  user$!: User;
  updateUserForm = new FormGroup({
    updateUserName: new FormControl(null, Validators.required),
    updateUserOrganization: new FormControl(null, Validators.required),
    updateUserRole: new FormControl(null, Validators.required)
  })


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService,
    private http: HttpClient,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      throw new Error('No id found');
    }

    this.userService.get(id).subscribe(
      {
        next: user => {
          this.user$ = user;
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

  updateUserData() {
    this.toastService.show('Gebruiker wordt aangepast!', {classname: 'bg-info text-light', delay: 3000});
    this.userService.updateUser(
      this.user$,
      this.updateUserForm.value["updateUserName"],
      this.updateUserForm.value["updateUserOrganization"],
      this.updateUserForm.value["updateUserRole"],
    ).subscribe({
          next: () => {
            this.toastService.show('Gebruiker succesvol aangepast', {classname: 'bg-success text-light', delay: 3000});
            this.router.navigate(['/users']);
          }
        }
      );
  }

  userRoleToText(userRole: string) {
    if (userRole == "SPINE_ADMIN") return "Spine Administrator"
    if (userRole == "SPINE_USER") return "Spine Gebruiker"
    if (userRole == "CAREGIVER") return "Hulpverlener"
    return "Onbekende Rol"
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }


}
