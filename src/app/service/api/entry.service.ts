import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entry } from 'src/app/shared/models/entry.model';

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
  
}
