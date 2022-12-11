import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.changePasswordForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onChangePassword() {
    let email = this.changePasswordForm.value['email'];

    console.log(this.changePasswordForm.value);

    let url = "http://localhost:8080/auth/request-password-reset";

    this.http.post(url, {email: email}).subscribe((res) => {
      console.log(res);
    });
  }
}
