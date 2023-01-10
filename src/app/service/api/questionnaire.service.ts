import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/shared/form/question-base';
import { Questionnaire } from 'src/app/shared/models/questionnaire.model';


@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  httpClient: HttpClient;

  constructor(private http: HttpClient) {
    this.httpClient = http;
  }

  getAll(): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>('/questionnaire/all');
  }

  get(id: string): Observable<Questionnaire> {
    return this.http.get<Questionnaire>('/questionnaire/' + id);
  }

  getQuestions(id: string): Observable<QuestionBase<any>[]> {
    return this.http.get<QuestionBase<any>[]>('/questionnaire/' + id + '/questions');
  }
}
