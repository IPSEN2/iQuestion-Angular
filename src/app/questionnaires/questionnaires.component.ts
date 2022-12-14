import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Questionnaire {
  id: number;
  name: string;
  date: string;
  author: string;
}

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss'],
})
export class QuestionnairesComponent {
  questionnaires: Questionnaire[] = [];

  constructor(private http: HttpClient) {
    this.http
      .get('/questionnaire/all')
      .subscribe((data) => {
        this.populateQuestionnaires(data);
      });
  }

  populateQuestionnaires(data: any) {
    for (let i = 0; i < data.length; i++) {
      this.questionnaires.push({
        id: data[i].id,
        name: data[i].name,
        date: data[i].timestamp,
        author: data[i].author.name,
      });
    }
  }
}
