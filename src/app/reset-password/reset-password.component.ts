import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../shared/toast/toast-service';
import {HttpClient} from '@angular/common/http';
import {UserService} from "../service/api/user.service";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  changePasswordForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private userService: UserService
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

  onRequestNewPassword() {
    const email = this.changePasswordForm.value['email'];
    this.toastService.show(
      '⚙️ - Bezig met het aanvragen van een nieuw wachtwoord...',
      {classname: 'bg-info text-light', delay: 15000}
    );

    this.userService.requestPasswordReset(email).subscribe({
        next: () => {
          this.toastService.clear();
          this.toastService.show(
            '✅ - We hebben een e-mail gestuurd met je verficatie token!',
            {classname: 'bg-success text-light', delay: 5000}
          );
        },
        error: errorMessage => {
          this.toastService.clear();
          this.toastService.show(
            '❌ - ' + errorMessage, {
              classname: 'bg-danger text-light', delay: 5000
            }
          );
        }
      }
    );
  }

  ngOnDestroy() {
    this.toastService.clear();
  }
}
