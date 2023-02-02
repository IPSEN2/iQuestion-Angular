import {NgModule} from "@angular/core";
import {QuestionnairesComponent} from "./questionnaires.component";
import {QuestionnaireDeleteComponent} from "./questionnaire-delete/questionnaire-delete.component";
import {QuestionnaireFillComponent} from "./questionnaire-fill/questionnaire-fill.component";
import {QuestionnairesViewComponent} from "./questionnaires-view/questionnaires-view.component";
import {QuestionnairesCreateComponent} from "./questionnaires-create/questionnaires-create.component";
import {IdComponent} from "./questionnaire-fill/id/id.component";
import {SharedModule} from "../shared/shared.module";
import {EntryFormComponent} from "./questionnaire-fill/id/entry-form.component";
import {EntryFormQuestionComponent} from "./questionnaire-fill/id/entry-form-question.component";
import {QuestionnairesRoutingModule} from "./questionnaires-routing.module";

@NgModule({
  declarations: [
    QuestionnairesComponent,
    QuestionnaireDeleteComponent,
    QuestionnaireFillComponent,
    QuestionnairesViewComponent,
    QuestionnairesCreateComponent,
    IdComponent,
    EntryFormComponent,
    EntryFormQuestionComponent
  ],
  imports: [
    QuestionnairesRoutingModule,
    SharedModule
  ]
})
export class QuestionnairesModule {

}
