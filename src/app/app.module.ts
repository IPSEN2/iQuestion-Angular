import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestTokenComponent } from './reset-password/request-token/request-token.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    RequestTokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
