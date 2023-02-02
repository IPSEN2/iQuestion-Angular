import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable} from 'rxjs';
import { QuestionBase } from 'src/app/shared/form/question-base';
import { Questionnaire } from 'src/app/shared/models/questionnaire.model';
import {ErrorHandlingService} from "../../shared/services/error-handling.service";


@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
  }

  getAll(): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>('/questionnaire/all')
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  get(id: string): Observable<Questionnaire> {
    return this.http.get<Questionnaire>('/questionnaire/' + id)
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  getQuestions(id: string): Observable<QuestionBase<any>[]> {
    return this.http.get<QuestionBase<any>[]>('/questionnaire/' + id + '/questions')
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  delete(id: string) {
    return this.http.delete('/questionnaire/' + id)
      .pipe(catchError(this.errorHandlingService.handleError));
  }
}
