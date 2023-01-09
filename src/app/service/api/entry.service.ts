import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entry } from 'src/app/shared/models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  constructor(private http: HttpClient) {
  }

  save(entry: Entry) {
    return this.http.put('/entry/', entry);
  }
}
