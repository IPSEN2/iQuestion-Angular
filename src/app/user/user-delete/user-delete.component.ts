import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../shared/models/user.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent {
  @Input() public user: User | undefined;

  constructor(private http: HttpClient, public activeModal: NgbActiveModal) {
  }


  deleteUser(){
    console.log(this.user);
    // @ts-ignore
    this.http.delete("/user/" + String(this.user.id))
      .subscribe((s) => {
        console.log(s)
      });
    this.activeModal.dismiss();
  }

}
