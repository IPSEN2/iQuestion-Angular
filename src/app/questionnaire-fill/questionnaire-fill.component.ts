import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionnaireService } from '../service/api/questionnaire.service';
import { EntryFormService } from '../service/entry-form.service';
import { QuestionBase } from '../shared/form/question-base';

@Component({
  selector: 'app-questionnaire-fill',
  templateUrl: './questionnaire-fill.component.html',
  styleUrls: ['./questionnaire-fill.component.scss'],
})
export class QuestionnaireFillComponent {
  questions$: Observable<QuestionBase<any>[]>;

  constructor(
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private entryFormService: EntryFormService
  ) {
    this.questions$ = new Observable<QuestionBase<any>[]>();
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {    
      throw new Error('No id found');
    }
    
    // get questionnaire from api then create questions
    this.questionnaireService.get(id).subscribe((questionnaire) => {
      this.questions$ = this.entryFormService.getQuestions(questionnaire);
    });
  }
}
