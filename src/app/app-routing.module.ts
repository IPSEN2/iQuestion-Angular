import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionnairesComponent} from './questionnaires/questionnaires.component';
import {QuestionnairesViewComponent} from './questionnaires/questionnaires-view/questionnaires-view.component';
import {QuestionnairesCreateComponent} from './questionnaires/questionnaires-create/questionnaires-create.component';
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./auth/login/login.component";
import {UserComponent} from './user/user.component';
import {UserCreateComponent} from "./user/user-create/user-create.component";
import {UserOverviewComponent} from "./user/user-overview/user-overview.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {QuestionnaireFillComponent} from './questionnaires/questionnaire-fill/questionnaire-fill.component';
import {IdComponent} from './questionnaires/questionnaire-fill/id/id.component';
import {EntriesComponent} from './entries/entries.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ChangePasswordComponent} from './reset-password/change-password/change-password.component';
import {EntriesViewComponent} from "./entries/entries-view/entries-view.component";
import {EntriesOverviewComponent} from "./entries/entries-overview/entries-overview.component";

const routes: Routes = [
  {path: '', redirectTo: 'questionnaires', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'change-password', children: [
      {path: '', component: ResetPasswordComponent},
      {path: ':token', component: ChangePasswordComponent}
    ]
  },
  {
    path: 'questionnaires', component: QuestionnairesComponent, canActivate: [AuthGuard], children: [
      {path: '', component: QuestionnairesViewComponent},
      {path: 'new', component: QuestionnairesCreateComponent},
      {
        path: 'fill', component: QuestionnaireFillComponent, data: {roles: ['CAREGIVER']}, children: [
          //TODO: Add route for when no id is given
          {path: ':id', component: IdComponent}
        ]
      },
    ]
  },
  {
    path: 'users', component: UserComponent, canActivate: [AuthGuard], data: {roles: ['SPINE_ADMIN']}, children: [
      {path: '', component: UserOverviewComponent},
      {path: 'new', component: UserCreateComponent},
      {path: 'edit/:id', component: UserEditComponent},
    ]
  },
  {path: 'entries', component: EntriesComponent, canActivate: [AuthGuard], data: {roles: ['CAREGIVER']}, children: [
      {path: '', component: EntriesOverviewComponent},
      {path: ':id', component: EntriesViewComponent}
    ]

  },
  {path: '**', redirectTo: '/questionnaires'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
