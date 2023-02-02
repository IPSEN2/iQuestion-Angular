import { Injectable } from '@angular/core';

import { QuestionBase } from '../shared/form/question-base';
import { DropdownQuestion } from '../shared/form/question-dropdown';
import { TextareaQuestion } from '../shared/form/question-textarea';
import { Questionnaire } from '../shared/models/questionnaire.model';

@Injectable({providedIn: "root"})
export class EntryFormService {
  getQuestions(questionnaire: Questionnaire) {
    let questions: QuestionBase<string>[] = [];

    questionnaire.segments.forEach((segment) => {
      // foreach question
      segment.questions.forEach((question) => {
        // if question has options, its a multiple choice question, thus a dropdown
        if (question.options != null) {
          const options: { key: string; value: string }[] = [];
          question.options.forEach((option) => {
            options.push({
              key: option,
              value: option,
            });
          });
          const q = new DropdownQuestion({
            key: question.id,
            label: question.label,
            options: options,
            required: true,
          });
          questions.push(q);
          return;
        }

        const q = new TextareaQuestion({
          key: question.id,
          label: question.label,
          value: '',
          required: true,
        });

        questions.push(q);
      });
    });

    return questions;
  }
}
