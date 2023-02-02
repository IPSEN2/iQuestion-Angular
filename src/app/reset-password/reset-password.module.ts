import {NgModule} from "@angular/core";
import {ResetPasswordComponent} from "./reset-password.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ResetPasswordRoutingModule} from "./reset-password-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    ResetPasswordRoutingModule,
    SharedModule
  ]
})
export class ResetPasswordModule{

}
