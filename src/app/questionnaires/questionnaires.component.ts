import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../service/api/questionnaire.service';
import { Questionnaire } from '../shared/models/questionnaire.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss'],
})
export class QuestionnairesComponent implements OnInit {
  questionnaires: Questionnaire[] = [];
  user = JSON.parse(localStorage.getItem("userData") || sessionStorage.getItem("userData") || "{}")

  constructor(private questionnaireService: QuestionnaireService) {
    this.questionnaireService
      .getAll()
      .subscribe((questionnaires) => (this.questionnaires = questionnaires));
  }

  ngOnInit(): void {
      console.log(this.user.user)
  }
}
