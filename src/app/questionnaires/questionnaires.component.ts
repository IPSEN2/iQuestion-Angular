import { Component } from '@angular/core';
import { QuestionnaireService } from '../service/api/questionnaire.service';
import { Questionnaire } from '../shared/models/questionnaire.model';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss'],
})
export class QuestionnairesComponent {
  questionnaires: Questionnaire[] = [];

  constructor(private questionnaireService: QuestionnaireService) {
    this.questionnaireService
      .getAll()
      .subscribe((questionnaires) => (this.questionnaires = questionnaires));
  }
}
