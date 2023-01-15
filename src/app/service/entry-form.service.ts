import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { QuestionBase } from '../shared/form/question-base';
import { TextboxQuestion } from '../shared/form/question-textbox';
import { Questionnaire } from '../shared/models/questionnaire.model';

@Injectable()
export class EntryFormService {

  
  getQuestions(questionnaire: Questionnaire) {
    let questions: QuestionBase<string>[] = [];

    questionnaire.segments.forEach((segment) => {
      // foreach question
      segment.questions.forEach((question) => {
        // create question
        var q = new TextboxQuestion({
          key: question.id,
          label: question.label,
          value: "",
          required: true,
        });

        questions.push(q);
      });
    });

    return of(questions);
  }
}
