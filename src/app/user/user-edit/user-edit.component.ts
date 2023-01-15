import {Component, OnDestroy} from '@angular/core';
import {User} from "../../shared/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../shared/toast/toast-service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../service/api/user.service";


@Component({
  selector: 'app-userEdit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnDestroy{
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
    private http: HttpClient
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      throw new Error('No id found');
    }

    this.userService.get(id).subscribe((user) => {
      this.user$ = user;
    });
  }

  updateUserData(){
    this.toastService.show('Gebruiker wordt aangepast!', {classname: 'bg-info text-light', delay: 3000});
    this.http.post('/user/' + this.user$.id, {
      name: this.updateUserForm.value.updateUserName,
      organization: this.updateUserForm.value.updateUserOrganization,
      role: this.updateUserForm.value.updateUserRole,
    })
      .subscribe({
        next: () => {
          this.toastService.show('Gebruiker succesvol aangepast', {classname: 'bg-success text-light', delay: 3000});
        }
      });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }



}
