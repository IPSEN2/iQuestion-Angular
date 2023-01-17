import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionnairesComponent} from './questionnaires/questionnaires.component';
import {QuestionnairesViewComponent} from './questionnaires/questionnaires-view/questionnaires-view.component';
import { QuestionnairesCreateComponent } from './questionnaires/questionnaires-create/questionnaires-create.component';
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./auth/login/login.component";
import {UserComponent} from './user/user.component';
import {UserCreateComponent} from "./user/user-create/user-create.component";
import {UserOverviewComponent} from "./user/user-overview/user-overview.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import { QuestionnaireFillComponent } from './questionnaires/questionnaire-fill/questionnaire-fill.component';
import { IdComponent } from './questionnaires/questionnaire-fill/id/id.component';
import { EntriesComponent } from './entries/entries.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './reset-password/change-password/change-password.component';

const routes: Routes = [
  {path: '', redirectTo: 'questionnaires', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'change-password', component: ResetPasswordComponent, children: [
    {path: ':token', component: ChangePasswordComponent}
  ]},
  {path: 'questionnaires', component: QuestionnairesComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'overview', pathMatch: 'full'},
    {path: 'overview', component: QuestionnairesViewComponent, canActivate: [AuthGuard]},
    {path: 'create', component: QuestionnairesCreateComponent, canActivate: [AuthGuard]},
    {path: 'fill', component: QuestionnaireFillComponent, canActivate: [AuthGuard], children: [
      //TODO: Add route for when no id is given
      {path: ':id', component: IdComponent, canActivate: [AuthGuard]}
    ]},
  ]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard], data: {roles: ['SPINE_ADMIN', 'SPINE_USER']}, children: [
    {path: '', redirectTo: 'overview', pathMatch: 'full'},
    {path: 'overview', component: UserOverviewComponent, canActivate: [AuthGuard], data: {roles: ['SPINE_ADMIN', 'SPINE_USER']}},
    {path: 'create', component: UserCreateComponent, canActivate: [AuthGuard], data: {roles: ['SPINE_ADMIN']}},
    {path: 'edit/:id', component: UserEditComponent, canActivate: [AuthGuard], data: {roles: ['SPINE_ADMIN']}},
  ]
},
  {path: 'entries', component: EntriesComponent, canActivate: [AuthGuard], data: {roles: ['CAREGIVER']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
