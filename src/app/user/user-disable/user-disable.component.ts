import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../shared/models/user.model";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "../../shared/toast/toast-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-disable',
  templateUrl: './user-disable.component.html',
  styleUrls: ['./user-disable.component.scss']
})
export class UserDisableComponent {
  @Input() public user: User | undefined;

  constructor(private http: HttpClient,
              public activeModal: NgbActiveModal,
              private toastService: ToastService,
              private router: Router) {
  }


  disableUser(){
    this.toastService.show('Gebruiker wordt aangepast!', {classname: 'bg-info text-light', delay: 3000});
    this.http.post('/user/' + this.user?.id, {
      enabled: 'false'
    })
      .subscribe({
        next: () => {
          this.toastService.show('Gebruiker succesvol aangepast', {classname: 'bg-success text-light', delay: 3000});
          this.router.navigate(['/users']);
          // window.location.reload();
        }
      });
    this.activeModal.dismiss();
  }

}
