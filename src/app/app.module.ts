import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { EntriesComponent } from './entries/entries.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorInterceptorService } from "./interceptors/error-interceptor.service";
import { HttpInterceptorService } from "./interceptors/http-interceptor.service";
import { NavigationComponent } from './navigation/navigation.component';
import { FilterPipe } from './pipe/filter.pipe';
import { QuestionnaireDeleteComponent } from "./questionnaires/questionnaire-delete/questionnaire-delete.component";
import { EntryFormQuestionComponent } from './questionnaires/questionnaire-fill/id/entry-form-question.component';
import { EntryFormComponent } from './questionnaires/questionnaire-fill/id/entry-form.component';
import { IdComponent } from './questionnaires/questionnaire-fill/id/id.component';
import { QuestionnaireFillComponent } from './questionnaires/questionnaire-fill/questionnaire-fill.component';
import { QuestionnairesCreateComponent } from './questionnaires/questionnaires-create/questionnaires-create.component';
import { QuestionnairesViewComponent } from './questionnaires/questionnaires-view/questionnaires-view.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { ChangePasswordComponent } from './reset-password/change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EntryFormService } from './service/entry-form.service';
import { QuestionControlService } from './shared/form/question-controle.service';
import { ToastsContainer } from "./shared/toast/toasts-container.component";
import { UserCreateComponent } from "./user/user-create/user-create.component";
import { UserDisableComponent } from './user/user-disable/user-disable.component';
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { UserOverviewComponent } from "./user/user-overview/user-overview.component";
import { UserComponent } from './user/user.component';


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
    UserDisableComponent,
    EntriesComponent,
    FilterPipe,
    FooterComponent,
    QuestionnairesViewComponent,
    QuestionnairesCreateComponent,
    IdComponent,
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
