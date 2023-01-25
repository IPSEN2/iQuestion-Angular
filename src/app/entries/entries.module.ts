import {NgModule} from "@angular/core";
import {EntriesRoutingModule} from "./entries-routing.module";
import {SharedModule} from "../shared/shared.module";
import {EntriesComponent} from "./entries.component";
import {EntriesViewComponent} from "./entries-view/entries-view.component";
import {EntriesOverviewComponent} from "./entries-overview/entries-overview.component";

@NgModule({
  declarations: [
    EntriesComponent,
    EntriesViewComponent,
    EntriesOverviewComponent,
  ],
  imports: [
    EntriesRoutingModule,
    SharedModule
  ]
})
export class EntriesModule {

}
