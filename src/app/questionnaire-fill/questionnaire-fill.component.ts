import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EntryService } from '../service/api/entry.service';
import { QuestionnaireService } from '../service/api/questionnaire.service';
import { EntryFormService } from '../service/entry-form.service';
import { QuestionBase } from '../shared/form/question-base';
import { Answer } from '../shared/models/answer.model';
import { Questionnaire } from '../shared/models/questionnaire.model';

@Component({
  selector: 'app-questionnaire-fill',
  templateUrl: './questionnaire-fill.component.html',
  styleUrls: ['./questionnaire-fill.component.scss'],
  providers: [ EntryFormService ]
})
export class QuestionnaireFillComponent {
  questions$: Observable<QuestionBase<any>[]> | null = null;
  questionnaire$!: Questionnaire;
  @ViewChild('form') formComponent: any;

  constructor(
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private entryService: EntryService,
    service: EntryFormService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {    
      throw new Error('No id found');
    }
    
    // get questionnaire from api then create questions
    this.questionnaireService.get(id).subscribe((questionnaire) => {
      this.questions$ = service.getQuestions(questionnaire);
      this.questionnaire$ = questionnaire;
    });
  }

  onSubmit() {
    let answers = [];
    // loop over form controls
    for (const control in this.formComponent.form.controls) {
      if (control != null) {
        answers.push({
          question: control,
          result: this.formComponent.form.controls[control].value,
          comment: '',
          id: undefined
        });
      }
    }
    const entry = {
      id: undefined,
      caregiver: undefined,
      questionnaire: this.questionnaire$.id,
      answers: answers,
      timestamp: undefined
    }

    this.entryService.create(entry).subscribe((entry) => {
      console.log(entry);
    });
  }
}
