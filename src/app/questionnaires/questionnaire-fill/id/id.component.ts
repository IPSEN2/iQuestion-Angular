import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {EntryService} from '../../../service/api/entry.service';
import {QuestionnaireService} from '../../../service/api/questionnaire.service';
import {EntryFormService} from '../../../service/entry-form.service';
import {QuestionBase} from '../../../shared/form/question-base';
import {Questionnaire} from '../../../shared/models/questionnaire.model';
import {ToastService} from '../../../shared/toast/toast-service';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.scss']
})
export class IdComponent {
  questions$: Observable<QuestionBase<any>[]> | null = null;
  questionnaire$!: Questionnaire;
  @ViewChild('form') formComponent: any;
  submitBtnDisabled: boolean = false;
  loading: boolean = false;

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
    this.questionnaireService.get(id).subscribe({
      next: (questionnaire) => {
        this.questions$ = service.getQuestions(questionnaire);
        this.questionnaire$ = questionnaire;
      },
      error: errorMessage => {
        this.toastService.show('❌ - ' + errorMessage, {
          classname: 'bg-danger text-light',
          delay: 2000,
        });
      }
    });
  }

  onSubmit() {
    this.toastService.show('⚙️ - Verwerken...', {
      classname: 'bg-info text-light',
      delay: 1000,
    });

    this.loading = true;

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

    this.entryService.create(entry).subscribe({
      next: () => {
        this.caregiverExportToPDF();
        this.router.navigate(['/questionnaires']);
        this.toastService.show('✅ - Opgeslagen, u wordt doorverwezen...', {
          classname: 'bg-success text-light',
          delay: 2000,
        });

        this.loading = false;
      },
      error: errorMessage => {
        this.toastService.show('❌ - ' + errorMessage, {
          classname: 'bg-danger text-light',
          delay: 2000,
        });

        this.loading = false;
      }
    });
  }

  caregiverExportToPDF() {
    const questions: any = [];
    const answers: any = [];
    const body = [];
    let pdfDocument = new jsPDF();

    for (const control in this.formComponent.form.controls) {
      answers.push(this.formComponent.form.controls[control].value);
    }
    for (let index = 0; index < answers.length; index++) {
      questions.push(this.questionnaire$.segments[0].questions[index].label);
    }
    for (let index = 0; index < answers.length; index++) {
      body.push([questions[index], answers[index]]);
    }

    pdfDocument.text('iQuestion', 10, 10);
    autoTable(pdfDocument, {
      head: [['Vraag', 'Antwoord']],
      body: [...body],
    });

    pdfDocument.save(this.questionnaire$.name + '.pdf');
  }
}
