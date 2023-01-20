import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EntryService } from '../service/api/entry.service';
import { QuestionnaireService } from '../service/api/questionnaire.service';
import { EntryFormService } from '../service/entry-form.service';
import { QuestionBase } from '../shared/form/question-base';
import { Questionnaire } from '../shared/models/questionnaire.model';
import { ToastService } from '../shared/toast/toast-service';

@Component({
  selector: 'app-questionnaire-fill',
  templateUrl: './questionnaire-fill.component.html',
  providers: [EntryFormService],
})
export class QuestionnaireFillComponent {
  questions$: Observable<QuestionBase<any>[]> | null = null;
  questionnaire$!: Questionnaire;
  @ViewChild('form') formComponent: any;
  submitBtnDisabled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private entryService: EntryService,
    service: EntryFormService,
    private toastService: ToastService,
    private router: Router
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
    this.toastService.show('⚙️ - Verwerken...', {
      classname: 'bg-info text-light',
      delay: 1000,
    });

    let answers = [];
    // loop over form controls
    for (const control in this.formComponent.form.controls) {
      if (control != null) {
        answers.push({
          question: control,
          result: this.formComponent.form.controls[control].value,
          comment: '',
          id: undefined,
        });
      }
    }
    const entry = {
      id: undefined,
      caregiver: undefined,
      questionnaire: this.questionnaire$.id,
      answers: answers,
      timestamp: undefined,
    };

    this.entryService.create(entry).subscribe((entry) => {
      this.router.navigate(['/questionnaires']);
      this.toastService.show('✅ - Opgeslagen, u wordt doorverwezen...', {
        classname: 'bg-success text-light',
        delay: 2000,
      });
    });
  }
}