import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../../../shared/form/question-base';

@Component({
  selector: 'app-entry-form-question',
  templateUrl: './entry-form-question.component.html',
  styleUrls: ['./entry-form-question.component.scss'],
})
export class EntryFormQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
}
