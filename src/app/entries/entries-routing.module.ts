import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {EntriesComponent} from "./entries.component";
import {AuthGuard} from "../auth/auth.guard";
import {EntriesOverviewComponent} from "./entries-overview/entries-overview.component";
import {EntriesViewComponent} from "./entries-view/entries-view.component";

const routes: Routes = [
  {
    path: '', component: EntriesComponent, canActivate: [AuthGuard], data: {roles: ['CAREGIVER']}, children: [
      {path: '', component: EntriesOverviewComponent},
      {path: ':id', component: EntriesViewComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule {

}
