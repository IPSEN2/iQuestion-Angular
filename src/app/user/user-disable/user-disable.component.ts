import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../shared/models/user.model";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "../../shared/toast/toast-service";
import {Router} from "@angular/router";
import {UserService} from "../../service/api/user.service";

@Component({
  selector: 'app-user-disable',
  templateUrl: './user-disable.component.html',
  styleUrls: ['./user-disable.component.scss']
})
export class UserDisableComponent {
  @Input() public user: User | undefined;
  @Output() disableConfirmed: EventEmitter<boolean> = new EventEmitter()

  constructor(private http: HttpClient,
              public activeModal: NgbActiveModal,
              private toastService: ToastService,
              private router: Router,
              private userService: UserService) {
  }


  disableUser() {
    this.toastService.show('Gebruiker wordt aangepast!', {classname: 'bg-info text-light', delay: 3000});
    this.userService.disableUser(this.user?.id).subscribe({
        next: () => {
          this.toastService.show('Gebruiker succesvol gedeactiveerd!', {classname: 'bg-success text-light', delay: 3000});
          this.router.navigate(['/users']);
          this.disableConfirmed.emit(true);
          this.activeModal.dismiss();
        },
        error: errorMessage => {
          this.toastService.show(
            '❌ - ' + errorMessage,
            {classname: 'bg-danger text-light', delay: 5000}
          );
        }
      }
    );
  }
}
