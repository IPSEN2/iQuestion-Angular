import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {EntryDto} from 'src/app/shared/models/entry-dto';
import {Entry} from 'src/app/shared/models/entry.model';
import {ErrorHandlingService} from "../../shared/services/error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
  }

  create(entry: Entry) {
    return this.http.put('/entry/', entry)
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  exportToCsv(questionnaireId: string) {
    return this.http.get('/entry/export/' + questionnaireId + '/csv', {
      responseType: 'blob'
    }).pipe(catchError(this.errorHandlingService.handleError));
  }

  exportToJson(questionnaireId: string) {
    return this.http.get('/entry/export/' + questionnaireId + '/json', {
      responseType: 'blob'
    }).pipe(catchError(this.errorHandlingService.handleError));
  }

  get(entryId: string): Observable<EntryDto> {
    return this.http.get<EntryDto>('/entry/' + entryId)
      .pipe(catchError(this.errorHandlingService.handleError));
  }

  getAll(): Observable<EntryDto[]> {
    return this.http.get<EntryDto[]>('/entry/all')
      .pipe(catchError(this.errorHandlingService.handleError));
  }
}
