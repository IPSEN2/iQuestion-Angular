import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
