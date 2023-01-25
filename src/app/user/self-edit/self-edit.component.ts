import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorModel } from 'src/app/shared/error.model';
import { User } from 'src/app/shared/models/user.model';
import { LocalUserService } from 'src/app/shared/services/localUser.service';
import { ToastService } from 'src/app/shared/toast/toast-service';

@Component({
  selector: 'app-self-edit',
  templateUrl: './self-edit.component.html',
  styleUrls: ['./self-edit.component.scss'],
})
export class SelfEditComponent {
  constructor(
    private localUserService: LocalUserService,
    private toastService: ToastService,
    private http: HttpClient
  ) {}

  user = this.localUserService.localUser;

  loading = false;

  editSelfForm: FormGroup = new FormGroup({
    name: new FormControl(this.user.user?.name, Validators.required),
    email: new FormControl(this.user.user?.email, Validators.required),
    organization: new FormControl(this.user.user?.organization, [
      Validators.required,
    ]),
  });

  onSubmit() {
    // Get all the items from the form
    const name = this.editSelfForm.value['name'];

    const userModel = {
      id: this.user.user?.id,
      name: name,
      email: this.user.user?.email,
      organization: this.user.user?.organization,
      enabled: this.user.user?.enabled,
      role: this.user.user?.role,
    };

    // Request the API to update the user
    const url = '/user/' + this.user.user?.id;

    this.toastService.show('⚙️ - Bezig met het bijwerken van je gegevens...', {
      classname: 'bg-info text-light',
      delay: 3000,
    });

      this.loading = true;

    this.http.post(url, userModel)
    .subscribe({
      next: (result: any) => {
        this.toastService.show('✅ - Je gegevens zijn succesvol bijgewerkt!', {
          classname: 'bg-success text-light',
          delay: 5000,
        });

        // Update the local user
        this.localUserService.localUser.user = result;
        let userData = JSON.parse(localStorage.getItem('userData') || '{}');
        userData.user = result;

        if (localStorage.getItem('userData') !== null) {
          localStorage.setItem('userData', JSON.stringify(userData));
        } else if (sessionStorage.getItem('userData') !== null) {
          sessionStorage.setItem('userData', JSON.stringify(userData));
        } else {
          this.toastService.show('❌ - Er is een fout opgetreden!', {
            classname: 'bg-danger text-light',
            delay: 5000,
          });
        }
        this.loading = false;
      },
      error: (error) => {
        let errorMessage = error.error.message;
        this.toastService.show(
          '❌ - Foutmelding ' +
            (ErrorModel.errorMap.get(errorMessage) || errorMessage),
          { classname: 'bg-danger text-light', delay: 5000 }
        );

        this.loading = false;
      },
    });
  }

  onChangePassword() {
    const url = '/auth/request-password-reset';
    const email = this.editSelfForm.value['email'];
    this.toastService.show(
      '⚙️ - Bezig met het aanvragen van een nieuw wachtwoord...',
      { classname: 'bg-info text-light', delay: 3000 }
    );

    this.loading = true;

    this.http.post(url, { email: email }).subscribe({
      next: () => {
        this.toastService.show(
          '✅ - We hebben een e-mail gestuurd met je verficatie token!',
          { classname: 'bg-success text-light', delay: 5000 }
        );

        this.loading = false;
      },
      error: (error) => {
        let errorMessage = error.error.message;
        this.toastService.show(
          '❌ - Foutmelding ' +
            (ErrorModel.errorMap.get(errorMessage) || errorMessage),
          { classname: 'bg-danger text-light', delay: 5000 }
        );

        this.loading = false;
      },
    });
  }
}
