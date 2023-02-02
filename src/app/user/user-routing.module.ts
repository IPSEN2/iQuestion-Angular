import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {AuthGuard} from "../auth/auth.guard";
import {UserOverviewComponent} from "./user-overview/user-overview.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {UserEditComponent} from "./user-edit/user-edit.component";

const routes: Routes = [
  {
    path: '', component: UserComponent, canActivate: [AuthGuard], data: {roles: ['SPINE_ADMIN']}, children: [
      {path: '', component: UserOverviewComponent},
      {path: 'new', component: UserCreateComponent},
      {path: 'edit/:id', component: UserEditComponent},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {

}
