import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ChangePasswordComponent} from './reset-password/change-password/change-password.component';
import {ToastsContainer} from "./shared/toast/toasts-container.component";
import { QuestionnaireFillComponent } from './questionnaires/questionnaire-fill/questionnaire-fill.component';
import { EntryFormComponent } from './shared/form/entry/entry-form.component';
import { EntryFormQuestionComponent } from './shared/form/entry/entry-form-question.component';
import { EntryFormService } from './service/entry-form.service';
import { QuestionControlService } from './shared/form/question-controle.service';
import {ErrorInterceptorService} from "./interceptors/error-interceptor.service";
import { UserDisableComponent } from './user/user-disable/user-disable.component';
import { EntriesComponent } from './entries/entries.component';
import { FilterPipe } from './pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { QuestionnairesViewComponent } from './questionnaires/questionnaires-view/questionnaires-view.component';
import { QuestionnairesCreateComponent } from './questionnaires/questionnaires-create/questionnaires-create.component';
import { IdComponent } from './questionnaires/questionnaire-fill/id/id.component';
import {QuestionnaireDeleteComponent} from "./questionnaires/questionnaire-delete/questionnaire-delete.component";
import { SelfEditComponent } from './user/self-edit/self-edit.component';
import { EntriesViewComponent } from './entries/entries-view/entries-view.component';
import { EntriesOverviewComponent } from './entries/entries-overview/entries-overview.component';

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
    UserDisableComponent,
    EntriesComponent,
    FilterPipe,
    FooterComponent,
    QuestionnairesViewComponent,
    QuestionnairesCreateComponent,
    IdComponent,
    SelfEditComponent,
    EntriesViewComponent,
    EntriesOverviewComponent,
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
