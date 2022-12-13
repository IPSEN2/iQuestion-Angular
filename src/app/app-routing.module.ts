import {createComponent, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { UserComponent } from './user/user.component';
import {CreateComponent} from "./user/create/create.component";
import {OverviewComponent} from "./user/overview/overview.component";
import {EditComponent} from "./user/edit/edit.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'questionnaires', component: QuestionnairesComponent},
  {path: 'user', component: UserComponent},
  {path: 'userOverview', component: OverviewComponent},
  {path: 'userCreate', component: CreateComponent},
  {path: 'userEdit', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
