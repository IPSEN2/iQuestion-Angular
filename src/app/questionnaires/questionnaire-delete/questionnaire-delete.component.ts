import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { Questionnaire } from 'src/app/shared/models/questionnaire.model';

@Component({
  selector: 'app-questionnaire-delete',
  templateUrl: './questionnaire-delete.component.html'
})
export class QuestionnaireDeleteComponent {
  @Input() public questionnaire: Questionnaire | undefined;
  @Output() deleteConfirmed: EventEmitter<boolean> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {
  }

  delete() {
    this.deleteConfirmed.emit(true);
    this.activeModal.dismiss();
  }
}
