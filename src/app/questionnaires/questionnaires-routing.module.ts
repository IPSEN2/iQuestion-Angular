import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {QuestionnairesComponent} from "./questionnaires.component";
import {AuthGuard} from "../auth/auth.guard";
import {QuestionnairesViewComponent} from "./questionnaires-view/questionnaires-view.component";
import {QuestionnairesCreateComponent} from "./questionnaires-create/questionnaires-create.component";
import {QuestionnaireFillComponent} from "./questionnaire-fill/questionnaire-fill.component";
import {IdComponent} from "./questionnaire-fill/id/id.component";

const routes: Routes = [
  {
    path: '', component: QuestionnairesComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: QuestionnairesViewComponent},
      {path: 'new', component: QuestionnairesCreateComponent, data: {roles: ["SPINE_USER", "SPINE_ADMIN"]}},
      {
        path: 'fill', component: QuestionnaireFillComponent, data: {roles: ['CAREGIVER']}, children: [
          {path: ':id', component: IdComponent}
        ]
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnairesRoutingModule {

}
