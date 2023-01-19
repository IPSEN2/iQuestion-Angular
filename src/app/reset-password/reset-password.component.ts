import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../shared/toast/toast-service';
import {HttpClient} from '@angular/common/http';
import {ErrorModel} from 'src/app/shared/error.model';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.changePasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onChangePassword() {
    const url = '/auth/request-password-reset';
    const email = this.changePasswordForm.value['email'];
    this.toastService.show(
      '⚙️ - Bezig met het aanvragen van een nieuw wachtwoord...',
      {classname: 'bg-info text-light', delay: 3000}
    );

    this.http.post(url, {email: email})
      .subscribe({
          next: () => {
            this.toastService.show(
              '✅ - We hebben een e-mail gestuurd met je verficatie token!',
              {classname: 'bg-success text-light', delay: 5000}
            );
          },
          error: (error) => {
            let errorMessage = error.error.message;
            this.toastService.show(
              '❌ - Foutmelding ' + (ErrorModel.errorMap.get(errorMessage) || errorMessage),
              {classname: 'bg-danger text-light', delay: 5000}
            );
          }
        }
      );
  }
}
