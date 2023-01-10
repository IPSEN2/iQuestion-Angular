import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionnaireService } from '../service/api/questionnaire.service';
import { Questionnaire } from '../shared/models/questionnaire.model';
import { ToastService } from '../shared/toast/toast-service';
import { QuestionnaireDeleteComponent } from './questionnaire-delete/questionnaire-delete.component';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss'],
})
export class QuestionnairesComponent {
  questionnaires: Questionnaire[] = [];

  constructor(
    private questionnaireService: QuestionnaireService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {
    this.questionnaireService
      .getAll()
      .subscribe((questionnaires) => (this.questionnaires = questionnaires));
  }

  delete(questionnaire: Questionnaire) {
    const modalRef = this.modalService.open(QuestionnaireDeleteComponent);
    modalRef.componentInstance.questionnaire = questionnaire;
    modalRef.componentInstance.deleteConfirmed.subscribe((deleteConfirmed: boolean) => {
      if (deleteConfirmed) {
        this.toastService.show(
          '⚙️ - Bezig met verwijderen',
          {classname: 'bg-info text-light', delay: 3000}
        );
        this.questionnaireService.delete(questionnaire.id).subscribe(() => {
          // remove from overview
          this.questionnaires = this.questionnaires.filter(
            (q) => q.id !== questionnaire.id
          );
          this.toastService.show(
            '✅ - Successvol verwijderd!',
            {classname: 'bg-success text-light', delay: 5000}
          );
        });
      }
    });
  }
}
