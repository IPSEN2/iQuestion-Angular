import { Component } from '@angular/core';
import { EntryService } from '../service/api/entry.service';
import { QuestionnaireService } from '../service/api/questionnaire.service';
import { Questionnaire } from '../shared/models/questionnaire.model';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss'],
})
export class QuestionnairesComponent {
  questionnaires: Questionnaire[] = [];

  constructor(
    private questionnaireService: QuestionnaireService,
    private entryService: EntryService
  ) {
    this.questionnaireService
      .getAll()
      .subscribe((questionnaires) => (this.questionnaires = questionnaires));
  }

  delete(id: string) {
    this.questionnaireService.delete(id).subscribe(() => {
      this.questionnaires = this.questionnaires.filter(
        (questionnaire) => questionnaire.id !== id
      );
    });
  }

  exportToCsv(questionnaire: Questionnaire) {
    this.entryService.exportToCsv(questionnaire.id).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = questionnaire.name + '.csv';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  exportToJson(questionnaire: Questionnaire) {
    this.entryService.exportToJson(questionnaire.id).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = questionnaire.name + '.json';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
