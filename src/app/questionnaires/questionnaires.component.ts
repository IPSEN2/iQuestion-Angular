import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../service/api/questionnaire.service';
import { Questionnaire } from '../shared/models/questionnaire.model';
import { User } from '../shared/models/user.model';
import { LocalUserService } from '../shared/services/localUser.service';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss'],
})
export class QuestionnairesComponent {
  constructor(private questionnaireService: QuestionnaireService, private localUserService: LocalUserService) {
    this.questionnaireService
      .getAll()
      .subscribe((questionnaires) => (this.questionnaires = questionnaires));
  }

  questionnaires: Questionnaire[] = [];
  user = this.localUserService.localUser
}
