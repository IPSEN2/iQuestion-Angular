import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'questionnaires', component: QuestionnairesComponent},
  {path: 'user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
