import {Component, OnDestroy} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../shared/toast/toast-service';
import {EntryService} from '../../service/api/entry.service';
import {QuestionnaireService} from '../../service/api/questionnaire.service';
import {Questionnaire} from '../../shared/models/questionnaire.model';
import {LocalUserService} from '../../shared/services/localUser.service';
import {QuestionnaireDeleteComponent} from '../questionnaire-delete/questionnaire-delete.component';

@Component({
  selector: 'app-questionnaires-view',
  templateUrl: './questionnaires-view.component.html',
  styleUrls: ['./questionnaires-view.component.scss']
})
export class QuestionnairesViewComponent implements OnDestroy{
  questionnaires: Questionnaire[] = [];
  public searchString: any;


  constructor(
    private questionnaireService: QuestionnaireService,
    private entryService: EntryService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private localUserService: LocalUserService
  ) {
    this.questionnaireService.getAll().subscribe({
      next: (questionnaires) => {
        this.questionnaires = questionnaires;
        this.questionnaires.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
      },
      error: errorMessage => {
        this.toastService.show(
          '❌ - ' + errorMessage,
          {classname: 'bg-danger text-light', delay: 5000}
        );
      }
    });
  }

  exportToCsv(questionnaire: Questionnaire) {
    this.entryService.exportToCsv(questionnaire.id).subscribe(
      {
        next: (blob) => {
          this.downloadFile(blob, questionnaire.name + '.csv');
        },
        error: errorMessage => {
          this.toastService.show('❌ - ' + errorMessage, {
            classname: 'bg-danger text-light',
            delay: 5000,
          });
        }
      }
    );
  }

  exportToJson(questionnaire: Questionnaire) {
    this.entryService.exportToJson(questionnaire.id).subscribe({
        next: (blob) => {
          this.downloadFile(blob, questionnaire.name + '.json');
        },
        error: errorMessage => {
          this.toastService.show('❌ - ' + errorMessage, {
            classname: 'bg-danger text-light',
            delay: 5000,
          });
        }
      }
    );
  }

  private downloadFile(blob: Blob, filename: string) {
    // A temporary link html-element is used to download the blob
    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    a.href = objectUrl;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

  delete(questionnaire: Questionnaire) {
    const modalRef = this.modalService.open(QuestionnaireDeleteComponent);
    modalRef.componentInstance.questionnaire = questionnaire;
    modalRef.componentInstance.deleteConfirmed.subscribe(
      (deleteConfirmed: boolean) => {
        if (deleteConfirmed) {
          this.toastService.show('⚙️ - Bezig met verwijderen', {
            classname: 'bg-info text-light',
            delay: 3000,
          });
          this.questionnaireService.delete(questionnaire.id).subscribe({
              next: () => {
                this.questionnaires = this.questionnaires.filter(
                  (q) => q.id !== questionnaire.id
                );
                this.toastService.show('✅ - Successvol verwijderd!', {
                    classname: 'bg-success text-light',
                    delay: 5000
                  }
                );
              },
              error: errorMessage => {
                this.toastService.show(
                  '❌ - ' + errorMessage,
                  {classname: 'bg-danger text-light', delay: 5000}
                );
              }
            }
          );
        }
      }
    );
  }

  user = this.localUserService.localUser;

  dateToLocale(date: number) {
    const jsDate = new Date(date)
    // Sorry dat ik niet de "options" naar een constant kan doen want om een of andere reden gaat angular dan huilie huilie doen
    return jsDate.toLocaleString('nl-NL', {year: "numeric", month: "long", day: "2-digit"});
  }

  ngOnDestroy() {
    this.toastService.clear();
  }
}
