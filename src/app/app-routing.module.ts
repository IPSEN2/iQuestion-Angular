import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionnairesComponent} from './questionnaires/questionnaires.component';
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./login/login.component";
import {UserComponent} from './user/user.component';
import {UserCreateComponent} from "./user/user-create/user-create.component";
import {UserOverviewComponent} from "./user/user-overview/user-overview.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/questionnaires', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'questionnaires', component: QuestionnairesComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent},
  {path: 'userOverview', component: UserOverviewComponent},
  {path: 'userCreate', component: UserCreateComponent},
  {path: 'userEdit', component: UserEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
