import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string | undefined;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/)]),
      'password': new FormControl(null, Validators.required)
    });
  }

  onLogin() {
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];

    this.authService.login(email, password).subscribe({
      next: () => {
        if (this.authService.user){
          this.router.navigate(['']);
          this.loginForm.reset();
        }
      },
      error: errorMessage => {
        this.error = errorMessage;
        this.loginForm.get('password')?.reset();
      }
    });
  }
}
