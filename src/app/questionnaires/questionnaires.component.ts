import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

interface Questionnaire {
  id: number;
  name: string;
  date: string;
  entryCount: number;
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
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIERldGFpbHMiLCJpc3MiOiJJLlF1ZXN0aW9uIiwiaWF0IjoxNjcwNzY4MjczLCJlbWFpbCI6InNwaW5lX2FkbWluQHRlc3QuY29tIn0.j4SBytNDMTXXyHimJFaFWwuM1VBTsqvnCBVV7cD4zuo'
    );
  this.http
    .get('http://localhost:8080/questionnaire/all', { headers: headers })
    .subscribe((data) => {
      this.populateQuestionnaires(data);
    });
  }

  populateQuestionnaires(data: any) {
    for (let i = 0; i < data.length; i++) {
      this.questionnaires.push({
        id: data[i].id,
        name: data[i].name,
        date: '',
        entryCount: 0,
        author: '',
      });
    }
  }
}
