import {NgModule} from "@angular/core";
import {UserRoutingModule} from "./user-routing.module";
import {UserComponent} from "./user.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {UserOverviewComponent} from "./user-overview/user-overview.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {UserDisableComponent} from "./user-disable/user-disable.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    UserComponent,
    UserCreateComponent,
    UserOverviewComponent,
    UserEditComponent,
    UserDisableComponent,
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule {

}
