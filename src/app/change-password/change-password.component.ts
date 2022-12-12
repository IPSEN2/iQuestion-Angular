import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})

export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;
  resetTokenForm!: FormGroup;

  showAlert: boolean = false;
  statusMessage!: String;

  isLoading: boolean = false;

  //$2a$10$AMq4yemf7uHP4niqRD0Dp.E9kXIAhP5hynwZKs/Bp4wunD2BLazXC
  //$2a$10$u084aoBEHPqT.15ZHHyfTecUl74A9dFEZhq.gKRlFlohcEqwGKdke

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
        this.showAlert = false;
        this.isLoading = true;
        this.showTokenResetBody = true;
      },
      (error) => {
        this.isLoading = true;
        this.showAlert = true;
        let statuscode = error.error.status;
        switch (statuscode) {
          case 400:
            this.statusMessage = 'Je heb al een reset link ontvangen, bekijk je email';
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

      },
      (error) => {
        // TODO: Handle error
        let statuscode = error.error.status;
        switch (statuscode) {
          // TODO: Handle error codes
        }
      }
    );
  }
}
