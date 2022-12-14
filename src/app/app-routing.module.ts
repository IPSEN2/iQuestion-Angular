import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { UsersComponent } from './users/users.component';
import {CreateQuestionnaireComponent} from "./create-questionnaire/create-questionnaire.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'questionnaires', component: QuestionnairesComponent},
  {path: 'users', component: UsersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
