import {Component, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../shared/toast/toast-service";


@Component({
  selector: 'app-userCreate',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})

export class UserCreateComponent implements OnDestroy {
  registerForm = new FormGroup({
    registerEmail: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/)]),
    registerName: new FormControl(null, Validators.required),
    registerOrganization: new FormControl(null, Validators.required),
    registerRole: new FormControl(null, Validators.required)
  })


  constructor(private http: HttpClient, private toastService: ToastService) {
  }

  createUser() {
    this.toastService.show('We zijn bezig om een account aan te maken!', {classname: 'bg-info text-light', delay: 3000});
    this.http.post('/auth/register/', {
      name: this.registerForm.value.registerName,
      email: this.registerForm.value.registerEmail,
      organization: this.registerForm.value.registerOrganization,
      role: this.registerForm.value.registerRole,
    })
      .subscribe({
        next: () => {
          this.toastService.show('Gebruiker succesvol aangemaakt', {classname: 'bg-success text-light', delay: 3000});
        }
      });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
