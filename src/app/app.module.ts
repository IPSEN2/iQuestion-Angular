import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { UsersComponent } from './users/users.component';
import { CreateQuestionnaireComponent } from './questionnaires/create-questionnaire/create-questionnaire.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    QuestionnairesComponent,
    UsersComponent,
    CreateQuestionnaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
