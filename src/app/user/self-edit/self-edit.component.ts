import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorModel } from 'src/app/shared/error.model';
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

    // Request the API to update the user
    const url = '/auth/user/' + this.user.user?.id;

    this.toastService.show(
      '⚙️ - Bezig met het bijwerken van je gegevens...',
      { classname: 'bg-info text-light', delay: 3000 }
    );

    this.http.post(url, { name: name }).subscribe({
      next: () => {
        this.toastService.show('✅ - Je gegevens zijn succesvol bijgewerkt!', {
          classname: 'bg-success text-light',
          delay: 5000,
        });
      },
      error: (error) => {
        let errorMessage = error.error.message;
        this.toastService.show(
          '❌ - Foutmelding ' +
            (ErrorModel.errorMap.get(errorMessage) || errorMessage),
          { classname: 'bg-danger text-light', delay: 5000 }
        );
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

    this.http.post(url, { email: email }).subscribe({
      next: () => {
        this.toastService.show(
          '✅ - We hebben een e-mail gestuurd met je verficatie token!',
          { classname: 'bg-success text-light', delay: 5000 }
        );
      },
      error: (error) => {
        let errorMessage = error.error.message;
        this.toastService.show(
          '❌ - Foutmelding ' +
            (ErrorModel.errorMap.get(errorMessage) || errorMessage),
          { classname: 'bg-danger text-light', delay: 5000 }
        );
      },
    });
  }
}
