import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent {
  @Input() public user: User | undefined;
  @Output() deleteConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) {
  }

  deleteUser() {
    this.deleteConfirmed.emit(true);
    this.activeModal.dismiss();
  }
}
