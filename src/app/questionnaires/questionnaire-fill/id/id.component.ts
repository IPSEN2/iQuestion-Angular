import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {EntryService} from '../../../service/api/entry.service';
import {QuestionnaireService} from '../../../service/api/questionnaire.service';
import {QuestionBase} from '../../../shared/form/question-base';
import {Questionnaire} from '../../../shared/models/questionnaire.model';
import {ToastService} from '../../../shared/toast/toast-service';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EntryFormService } from 'src/app/service/entry-form.service';
import { TextboxQuestion } from 'src/app/shared/form/question-textbox';

@Component({
  selector: 'app-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.scss']
})
export class IdComponent {
  questions$: QuestionBase<any>[] | null = null;
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
      this.questions$ = this.getDefaultQuestions().concat(service.getQuestions(questionnaire));
      this.questionnaire$ = questionnaire;
    });
  }

  getLabelByQuestionId(questionId: string) {
    let label = '';
    this.questions$?.forEach((question) => {
      if (question.key === questionId) {
        label = question.label;
      }
    });
    return label;
  }

  getDefaultQuestions() {
    // create string array
    let questions: string[] = [
      "Wanneer in het hulpverleningstraject binnen de organisatie is het kader ingevuld?\n (begin, midden of eind)",
      "Funtie van de hulpverlener (mentor, hoofdbehandelaar, gedragswetenschapper, etc.)",
      "Wat is de leeftijd van de cliënt (bij instroming (hulpverlenings)organisatie)?",
      "Indien bekend: wat was de leeftijd van de cliënt ten tijde van (het begin van) het slachtofferschap?",
      "Wat is de nationaliteit van de cliënt?",
      "Op welke afdeling verblijft de cliënt?",
      "Op welke datum is de cliënt ingestroomd?"
    ];

    // create question array
    let questionArray: QuestionBase<string>[] = [];

    // loop over questions
    let i = 0;
    questions.forEach((question) => {
      // create question
      const q = new TextboxQuestion({
        key: 'private-' + i,
        label: question,
        value: "",
        required: true
      });

      // push to question array
      questionArray.push(q);
      i++;
    });

    return questionArray;
  }

  onSubmit() {
    this.showProcessingToast();

    let answeredQuestions = [];
    let nonPrivateAnsweredQuestions = [];
    
    // loop over form controls
    for (const control in this.formComponent.form.controls) {
      console.log(this.formComponent.form.controls[control]);
        if (control != null) {
            let answeredQuestion = {
                question: control,
                result: this.formComponent.form.controls[control].value,
                comment: '',
                id: undefined,
                label: this.formComponent.form.controls[control].label
            };
            answeredQuestions.push(answeredQuestion);
        }
    }

    this.caregiverExportToPDF(answeredQuestions);

    // Filter out private questions
    nonPrivateAnsweredQuestions = answeredQuestions.filter(answeredQuestion => !answeredQuestion.question.startsWith('private-'));

    // Remove labels from answeredQuestion objects
    nonPrivateAnsweredQuestions = nonPrivateAnsweredQuestions.map(answeredQuestion => {
      delete answeredQuestion.label;
      return answeredQuestion;
    });

    const entry = {
      id: undefined,
      caregiver: undefined,
      questionnaire: this.questionnaire$.id,
      answers: nonPrivateAnsweredQuestions,
      timestamp: undefined,
    };

    this.entryService.create(entry).subscribe((entry) => {
      this.showSuccessToast();
      this.router.navigate(['/questionnaires']);
    });
  }

  caregiverExportToPDF(questionAndAnswers: any) {
    const body = [];
    let pdfDocument = new jsPDF();

    for (let questionAndAnswer of questionAndAnswers) {
      body.push([this.getLabelByQuestionId(questionAndAnswer.question), questionAndAnswer.result]);
    }

    pdfDocument.text('iQuestion', 10, 10);
    autoTable(pdfDocument, {
      head: [['Vraag', 'Antwoord']],
      body: [...body],
    });

    pdfDocument.save(this.questionnaire$.name + '.pdf');
  }

  showSuccessToast() {
    this.toastService.show('✅ - Opgeslagen, u wordt doorverwezen...', {
      classname: 'bg-success text-light',
      delay: 2000,
    });
  }

  showProcessingToast() {
    this.toastService.show('⚙️ - Verwerken...', {
      classname: 'bg-info text-light',
      delay: 1000,
    });
  }
}
