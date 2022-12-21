import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../shared/toast/toast-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  resetTokenForm!: FormGroup;

  showTokenResetBody: boolean = false;

  constructor(private http: HttpClient, private toastService: ToastService) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.changePasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
    this.resetTokenForm = new FormGroup({
      resetToken: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required]),
    });
  }

  onChangePassword() {
    const url = '/auth/request-password-reset';
    const email = this.changePasswordForm.value['email'];
    this.toastService.show(
      '⚙️ - Bezig met het aanvragen van een nieuw wachtwoord...',
      {classname: 'bg-info text-light', delay: 3000}
    );

    this.http.post(url, {email: email}).subscribe(
      (response) => {
        this.toastService.show(
          '✅ - We hebben een e-mail gestuurd met je verficatie token!',
          {classname: 'bg-success text-light', delay: 5000}
        );
        this.showTokenResetBody = true;
      },
      (error) => {
        let statuscode = error.error.status;
        switch (statuscode) {
          case 400:
            this.toastService.show(
              '❌ - Dit account heeft al een token ontvangen, vul hem op de volgende pagina in',
              {classname: 'bg-danger text-light', delay: 5000}
            );
            setTimeout(() => {
              this.showTokenResetBody = true;
            }, 2500);
            break;
          case 404:
            this.toastService.show(
              '❌ - Dit e-mail adres is niet bekend bij ons, probeer het opnieuw',
              {classname: 'bg-danger text-light', delay: 5000}
            );
            break;
          case 500:
            this.toastService.show(
              '❌ - Er is een onbekende fout opgetreden, probeer het later opnieuw',
              {classname: 'bg-danger text-light', delay: 5000}
            );
            break;
          default:
            this.toastService.show(
              '❌ - Er is een onbekende fout opgetreden, probeer het later opnieuw',
              {classname: 'bg-danger text-light', delay: 5000}
            );
            break;
        }
      }
    );
  }

  onResetPassword() {
    let token = this.resetTokenForm.value['resetToken'];
    let newPassword = this.resetTokenForm.value['newPassword'];
    this.toastService.show('⚙️ - Bezig met het veranderen van je wachtwoord...',
      {classname: 'bg-info text-light', delay: 3000}
    );

    const url = '/auth/change-password';

    this.http.post(url, {token: token, newPassword: newPassword}).subscribe(
      (response) => {
        this.toastService.show(
          '✅ - Je wachtwoord is succesvol gewijzigd, je wordt doorgestuurd naar de login pagina',
          {classname: 'bg-success text-light', delay: 3000}
        );
        setTimeout(() => {
          window.location.href = '/login';
        }, 2500);
      },
      (error) => {
        let statuscode = error.error.status;
        switch (statuscode) {
          case 404:
            this.toastService.show(
              '❌ - Dit token is niet bekend bij ons, probeer het opnieuw',
              {classname: 'bg-danger text-light', delay: 5000}
            );
            break;
          default:
            this.toastService.show(
              '❌ - Er is een onbekende fout opgetreden, probeer het later opnieuw',
              {classname: 'bg-danger text-light', delay: 5000}
            );
            break;
        }
      }
    );
  }
}
