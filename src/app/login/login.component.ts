import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'rememberMe': new FormControl(null)
    });
  }

  onLogin() {
    let email = this.loginForm.value['email'];
    let password = this.loginForm.value['password'];

    console.log(this.loginForm.value);

    let url = "http://localhost:8080/auth/login";

    this.http.post(url, {email: email, password: password}).subscribe((res) => {
      console.log(res);
    });
  }
}
