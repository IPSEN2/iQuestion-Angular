import { Component } from '@angular/core';
import {EntryDto} from "../../shared/models/entry-dto";
import {EntryService} from "../../service/api/entry.service";
import {ToastService} from "../../shared/toast/toast-service";

@Component({
  selector: 'app-entries-overview',
  templateUrl: './entries-overview.component.html',
  styleUrls: ['./entries-overview.component.scss']
})
export class EntriesOverviewComponent {
  entries: EntryDto[] = [];
  searchString: any;

  constructor(
    private entryService: EntryService,
    private toastService: ToastService
  ) {
    this.entryService.getAll().subscribe({
        next: (entries) => {
          this.entries = entries;
          this.entries.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
        },
        error: errorMessage => {
          this.toastService.show(
            '❌ - ' + errorMessage,
            {classname: 'bg-danger text-light', delay: 5000}
          );
        }
      }
    )
  }

}
