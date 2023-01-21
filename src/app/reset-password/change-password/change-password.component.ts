import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorModel } from 'src/app/shared/error.model';
import { ToastService } from 'src/app/shared/toast/toast-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  passwordToken = this.route.snapshot.paramMap.get('token');

  ngOnInit() {
    this.initForm(this.passwordToken ? this.passwordToken : '');
    if (this.passwordToken == null || this.passwordToken == '' || this.passwordToken == undefined) {
      this.toastService.show(
        '❌ - Foutmelding: Geen geldige token gevonden, probeer de link uit de email opnieuw in te voeren of neem contact op met de beheerder.',
        { classname: 'bg-danger text-light', delay: 10000 }
      );
    }
  }

  private initForm(passwordToken: string): void {
    this.changePasswordForm = new FormGroup({
      resetToken: new FormControl({value: passwordToken, disabled: true}, [Validators.required], ),
      newPassword: new FormControl(null, [Validators.required]),
    });
  }

  onChangePassword() {
    let token = this.changePasswordForm.value['resetToken'];
    let newPassword = this.changePasswordForm.value['newPassword'];
    this.toastService.show(
      '⚙️ - Bezig met het veranderen van je wachtwoord...',
      { classname: 'bg-info text-light', delay: 3000 }
    );

    const url = '/auth/change-password';
    this.http.post(url, { token: this.passwordToken, newPassword: newPassword }).subscribe(
      {
        next: () => {
          this.toastService.show(
            '✅ - Je wachtwoord is succesvol gewijzigd, je wordt doorgestuurd naar de login pagina',
            { classname: 'bg-success text-light', delay: 3000 }
          );
          setTimeout(() => {
            window.location.href = '/login';
          }, 2500);
        },
        error: error => {
          let errorMessage = error.error.message;
          this.toastService.show(
            '❌ - Foutmelding ' +
            (ErrorModel.errorMap.get(errorMessage) || errorMessage),
            { classname: 'bg-danger text-light', delay: 5000 }
          );
        }
      }
    );
  }
}
