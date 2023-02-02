import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../../../shared/form/question-base';
import { QuestionControlService } from '../../../shared/form/question-controle.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  providers: [ QuestionControlService ]
})
export class EntryFormComponent implements OnInit{
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}