import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionnairesComponent} from './questionnaires/questionnaires.component';
import {AuthGuard} from "./auth/auth.guard";
import { ChangePasswordComponent } from './change-password/change-password.component';
import {LoginComponent} from "./auth/login/login.component";
import {UserComponent} from './user/user.component';
import {UserCreateComponent} from "./user/user-create/user-create.component";
import {UserOverviewComponent} from "./user/user-overview/user-overview.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/questionnaires', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'questionnaires', component: QuestionnairesComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'userOverview', component: UserOverviewComponent, canActivate: [AuthGuard]},
  {path: 'userCreate', component: UserCreateComponent, canActivate: [AuthGuard]},
  {path: 'userEdit', component: UserEditComponent, canActivate: [AuthGuard]},
  {path: 'change-password', component: ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
