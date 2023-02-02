import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SelfEditComponent} from "./self-edit.component";
import {AuthGuard} from "../../auth/auth.guard";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    SelfEditComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      component: SelfEditComponent,
      canActivate: [AuthGuard]
    }]),
    SharedModule
  ]
})
export class SelfEditModule {

}
