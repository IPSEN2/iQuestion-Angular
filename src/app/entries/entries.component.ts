import { Component } from '@angular/core';
import { EntryService } from '../service/api/entry.service';
import { EntryDto } from '../shared/models/entry-dto';
import { Entry } from '../shared/models/entry.model';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent {
  entries: EntryDto[] = [];

  constructor(
    private entryService: EntryService,
  ) {
    this.entryService.getAll().subscribe((entries) => {
      this.entries = entries;
      this.entries.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
    });
  }
}
