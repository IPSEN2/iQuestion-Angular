import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {QuestionnairesComponent} from './questionnaires/questionnaires.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpInterceptorService} from "./interceptors/http-interceptor.service";
import {LoginComponent} from './auth/login/login.component';
import {UserComponent} from './user/user.component';
import {UserCreateComponent} from "./user/user-create/user-create.component";
import {UserOverviewComponent} from "./user/user-overview/user-overview.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ChangePasswordComponent} from './reset-password/change-password/change-password.component';
import {ToastsContainer} from "./shared/toast/toasts-container.component";
import { QuestionnaireFillComponent } from './questionnaires/questionnaire-fill/questionnaire-fill.component';
import { EntryFormComponent } from './shared/form/entry/entry-form.component';
import { EntryFormQuestionComponent } from './shared/form/entry/entry-form-question.component';
import { EntryFormService } from './service/entry-form.service';
import { QuestionControlService } from './shared/form/question-controle.service';
import {ErrorInterceptorService} from "./interceptors/error-interceptor.service";
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import {QuestionnairesCreateComponent} from "./questionnaires/questionnaires-create/questionnaires-create.component";
import { EntriesComponent } from './entries/entries.component';
import { FilterPipe } from './pipe/filter.pipe'; 
import { FooterComponent } from './footer/footer.component';
import { QuestionnairesViewComponent } from './questionnaires/questionnaires-view/questionnaires-view.component';
import { IdComponent } from './questionnaires/questionnaire-fill/id/id.component';
import {QuestionnaireDeleteComponent} from "./questionnaires/questionnaire-delete/questionnaire-delete.component";
import { SelfEditComponent } from './user/self-edit/self-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    QuestionnairesComponent,
    QuestionnaireDeleteComponent,
    UserComponent,
    UserCreateComponent,
    UserOverviewComponent,
    UserEditComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    QuestionnaireFillComponent,
    EntryFormQuestionComponent,
    EntryFormComponent,
    UserDeleteComponent,
    EntriesComponent,
    FilterPipe,
    FooterComponent,
    QuestionnairesViewComponent,
    QuestionnairesCreateComponent,
    IdComponent,
    SelfEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ToastsContainer,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    EntryFormService,
    QuestionControlService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
