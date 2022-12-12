import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, setTestabilityGetter } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})

export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;
  resetTokenForm!: FormGroup;

  showAlert: boolean = false;
  alertType: String = 'danger';
  statusMessage!: String;

  isLoading: boolean = false;

  showTokenResetBody: boolean = false;

  constructor(private http: HttpClient) {}

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
    const url = 'http://localhost:8080/auth/request-password-reset';
    const email = this.changePasswordForm.value['email'];
    this.isLoading = true;

    this.http.post(url, { email: email }).subscribe(
      (response) => {
        this.showAlert = true;
        this.alertType = 'success';
        this.statusMessage = 'Er is een email verstuurd met een reset link';
        setTimeout(() => {
          this.showTokenResetBody = true;
          this.showAlert = false;
        }, 2500);
      },
      (error) => {
        this.showAlert = true;
        this.alertType = 'danger';
        this.isLoading = true;
        let statuscode = error.error.status;
        switch (statuscode) {
          case 400:
            this.statusMessage = 'Je heb al een reset link ontvangen, bekijk je email';
            setTimeout(() => {
              this.showTokenResetBody = true;
              this.showAlert = false;
            }, 2500);
            break;
          case 404:
            this.statusMessage = 'Er is geen account met dit email adres';
            break;
          case 500:
            this.statusMessage = 'Er is iets mis gegaan, probeer het later opnieuw'
            ;
            break;
          default:
            this.statusMessage = 'Er is een onbekende fout opgetreden, probeer het later opnieuw';
            break;
        }
      }
    );
  }

  onResetPassword() {
    let token = this.resetTokenForm.value['resetToken'];
    let newPassword = this.resetTokenForm.value['newPassword'];


    const url = 'http://localhost:8080/auth/change-password';
    this.isLoading = true;

    this.http.post(url, { token: token, newPassword: newPassword}).subscribe(
      (response) => {
        // TODO: Handle response
        this.showAlert = true;
        this.alertType = 'success';
        this.statusMessage = 'Je wachtwoord is succesvol gewijzigd';
        // Redirect to login page
        setTimeout(() => {
          window.location.href = '/login';
        }, 2500);
      },
      (error) => {
        // TODO: Handle error
        let statuscode = error.error.status;
        this.showAlert = true;
        this.alertType = 'danger';
        switch (statuscode) {
          // TODO: Handle error codes
          case 404:
            this.statusMessage = 'Deze reset link is niet meer geldig of bestaat niet';
            break;
          default:
            this.statusMessage = 'Er is een onbekende fout opgetreden, probeer het later opnieuw';
            break;
        }
      }
    );
  }
}
