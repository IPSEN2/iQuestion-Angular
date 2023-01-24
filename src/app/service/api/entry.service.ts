import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryDto } from 'src/app/shared/models/entry-dto';
import { Entry } from 'src/app/shared/models/entry.model';
import {EntryDtoReceive} from "../../shared/models/entry-dto-receive";

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  constructor(private http: HttpClient) {
  }

  create(entry: Entry) {
    return this.http.put('/entry/', entry);
  }

  exportToCsv(questionnaireId: string) {
    return this.http.get('/entry/export/' + questionnaireId + '/csv', {
      responseType: 'blob'
    })
  }

  exportToJson(questionnaireId: string) {
    return this.http.get('/entry/export/' + questionnaireId + '/json', {
      responseType: 'blob'
    })
  }

  get(entryId: string): Observable<EntryDtoReceive> {
    return this.http.get<EntryDtoReceive>('/entry/' + entryId);
  }

  getAll(): Observable<EntryDto[]> {
    return this.http.get<EntryDto[]>('/entry/all');
  }
}
