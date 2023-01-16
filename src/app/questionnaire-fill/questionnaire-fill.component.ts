import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EntryService } from '../service/api/entry.service';
import { QuestionnaireService } from '../service/api/questionnaire.service';
import { EntryFormService } from '../service/entry-form.service';
import { QuestionBase } from '../shared/form/question-base';
import { Questionnaire } from '../shared/models/questionnaire.model';
import { ToastService } from '../shared/toast/toast-service';
import { jsPDF } from "jspdf";


@Component({
  selector: 'app-questionnaire-fill',
  templateUrl: './questionnaire-fill.component.html',
  providers: [EntryFormService],
})
export class QuestionnaireFillComponent {
  questions$: Observable<QuestionBase<any>[]> | null = null;
  questionnaire$!: Questionnaire;
  @ViewChild('form') formComponent: any;
  submitBtnDisabled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private entryService: EntryService,
    service: EntryFormService,
    private toastService: ToastService,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      throw new Error('No id found');
    }

    // get questionnaire from api then create questions
    this.questionnaireService.get(id).subscribe((questionnaire) => {
      this.questions$ = service.getQuestions(questionnaire);
      this.questionnaire$ = questionnaire;
    });
  }

  onSubmit() {
    this.toastService.show('⚙️ - Verwerken...', {
      classname: 'bg-info text-light',
      delay: 1000,
    });

    let questions = [];
    let answers = [];
    // loop over form controls
    for (const control in this.formComponent.form.controls) {
      if (control != null) {
        answers.push({
          question: control,
          result: this.formComponent.form.controls[control].value,
          comment: '',
          id: undefined,
        });
      }
    }
    const entry = {
      id: undefined,
      caregiver: undefined,
      questionnaire: this.questionnaire$.id,
      answers: answers,
      timestamp: undefined,
    };

    this.entryService.create(entry).subscribe((entry) => {
      // this.router.navigate(['/questionnaires']);
      this.toastService.show('✅ - Opgeslagen, u wordt doorverwezen...', {
        classname: 'bg-success text-light',
        delay: 2000
      });

      this.caregiverExportToPDF()
    });
  }

  caregiverExportToPDF() {
    const questions: String[] = []
    const answers: String[] = []
    for (const control in this.formComponent.form.controls) {
      answers.push(this.formComponent.form.controls[control].value)
    }
    for (let index = 0; index < answers.length; index++) {
      questions.push(this.questionnaire$.segments[0].questions[index].label)
    }

    let qanda = [questions, answers]

    let pdfDocument = new jsPDF();
    pdfDocument.text("iQuestion", 10, 10, {align: 'center'})
    pdfDocument.table(1,1, qanda, ["Vraag", "Antwoord"], {fontSize: 10})

    pdfDocument.save()
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
}
