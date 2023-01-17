import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionnairesComponent} from './questionnaires/questionnaires.component';
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./auth/login/login.component";
import {UserComponent} from './user/user.component';
import {UserCreateComponent} from "./user/user-create/user-create.component";
import {UserOverviewComponent} from "./user/user-overview/user-overview.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import { QuestionnaireFillComponent } from './questionnaire-fill/questionnaire-fill.component';
import { EntriesComponent } from './entries/entries.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './reset-password/change-password/change-password.component';

const routes: Routes = [
  {path: '', redirectTo: 'questionnaires', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'questionnaire/fill/:id', component: QuestionnaireFillComponent, canActivate: [AuthGuard]},
  {path: 'change-password', component: ResetPasswordComponent, children: [
    {path: ':token', component: ChangePasswordComponent}
  ]},
  {path: 'questionnaires', component: QuestionnairesComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard], data: {roles: ['SPINE_ADMIN', 'SPINE_USER']}},
  {path: 'userOverview', component: UserOverviewComponent, canActivate: [AuthGuard], data: {roles: ['SPINE_ADMIN', 'SPINE_USER']}},
  {path: 'userCreate', component: UserCreateComponent, canActivate: [AuthGuard], data: {roles: ['SPINE_ADMIN']}},
  {path: 'userEdit/:id', component: UserEditComponent, canActivate: [AuthGuard], data: {roles: ['SPINE_ADMIN']}},
  {path: 'entries', component: EntriesComponent, canActivate: [AuthGuard], data: {roles: ['CAREGIVER']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
