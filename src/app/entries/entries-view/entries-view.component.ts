import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EntryService} from "../../service/api/entry.service";
import {ToastService} from "../../shared/toast/toast-service";
import {EntryDtoReceive} from "../../shared/models/entry-dto-receive";



@Component({
  selector: 'app-entries-view',
  templateUrl: './entries-view.component.html',
  styleUrls: ['./entries-view.component.scss']
})
export class EntriesViewComponent {
  entry$!: EntryDtoReceive;


  constructor(
    private route: ActivatedRoute,
    private entryService: EntryService,
    private toastService: ToastService
  ) {
    const id = this.route.snapshot.paramMap.get("id");
    if (id == null){
      throw new Error('entry not found')
    }
    this.entryService.get(id).subscribe( {
      next: (entry) => {
        this.entry$ = entry;
      },
      error: errorMessage => {
        this.toastService.show(
          '❌ - ' + errorMessage,
          {classname: 'bg-danger text-light', delay: 5000}
        );
      }

    })
  }

}
