import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {QuestionnairesComponent} from './questionnaires/questionnaires.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpInterceptorService} from "./interceptors/http-interceptor.service";
import {LoginComponent} from './auth/login/login.component';
import {UserComponent} from './user/user.component';
import {UserCreateComponent} from "./user/user-create/user-create.component";
import {UserOverviewComponent} from "./user/user-overview/user-overview.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestTokenComponent } from './reset-password/request-token/request-token.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    QuestionnairesComponent,
    UserComponent,
    UserCreateComponent,
    UserOverviewComponent,
    UserEditComponent,,
    ChangePasswordComponent,
    ResetPasswordComponent,
    RequestTokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
