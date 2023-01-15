import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../shared/toast/toast-service';
import { Component } from '@angular/core';
import { EntryService } from '../service/api/entry.service';
import { QuestionnaireService } from '../service/api/questionnaire.service';
import { Questionnaire } from '../shared/models/questionnaire.model';
import { LocalUserService } from '../shared/services/localUser.service';
import { QuestionnaireDeleteComponent } from './questionnaire-delete/questionnaire-delete.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss'],
})
export class QuestionnairesComponent {
  questionnaires: Questionnaire[] = [];

  constructor(
    private questionnaireService: QuestionnaireService,
    private entryService: EntryService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private localUserService: LocalUserService
  ) {
    this.questionnaireService.getAll().subscribe((questionnaires) => {
      this.questionnaires = questionnaires;
      this.questionnaires.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
    });
  }

  exportToCsv(questionnaire: Questionnaire) {
    this.entryService.exportToCsv(questionnaire.id).subscribe(
      (blob) => {
        this.downloadFile(blob, questionnaire.name + '.csv');
      },
      (error) => {
        this.toastService.show('❌ - Er is iets misgegaan!', {
          classname: 'bg-danger text-light',
          delay: 5000,
        });
      }
    );
  }

  exportToJson(questionnaire: Questionnaire) {
    this.entryService.exportToJson(questionnaire.id).subscribe(
      (blob) => {
        this.downloadFile(blob, questionnaire.name + '.json');
      },
      (error) => {
        this.toastService.show('❌ - Er is iets misgegaan!', {
          classname: 'bg-danger text-light',
          delay: 5000,
        });
      }
    );
  }

  private downloadFile(blob: Blob, filename: string) {
    // A temportary link html-element is used to download the blob
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
          this.questionnaireService.delete(questionnaire.id).subscribe(
            (response) => {
              // remove from overview
              this.questionnaires = this.questionnaires.filter(
                (q) => q.id !== questionnaire.id
              );
              this.toastService.show('✅ - Successvol verwijderd!', {
                classname: 'bg-success text-light',
                delay: 5000,
              });
            },
            (error) => {
              this.toastService.show(
                '❌ - Er ging iets mis: ' + error.error.message,
                { classname: 'bg-danger text-light', delay: 5000 }
              );
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
}