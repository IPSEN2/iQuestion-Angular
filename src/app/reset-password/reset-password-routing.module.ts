import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ResetPasswordComponent} from "./reset-password.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: ResetPasswordComponent},
      {path: ':token', component: ChangePasswordComponent}
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule {

}
