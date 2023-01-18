import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {ToastService} from "../../shared/toast/toast-service";
import {ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.scss']
})

export class CreateQuestionnaireComponent {

  questionnaireQuestionsArray = new FormArray([]);
  questionnaireSegmentsArray = new FormArray([]);


  questionnaireForm = new FormGroup({
    questionnaireName: new FormControl(null, Validators.required),
    questionnaireDescription: new FormControl(null, Validators.required),
    questionnaireDate: new FormControl(null, Validators.required),
    userName: new FormControl(null, Validators.required),
    segments: this.questionnaireSegmentsArray,
    questions: this.questionnaireQuestionsArray,
  })

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastService: ToastService,
  ) {}

get segmentControls(){
    return (<FormArray>this.questionnaireForm.get('segments')).controls;
  }

  addNewSegment() {
    (<FormArray>this.questionnaireForm.get('segments')).push(new FormGroup({
        'segments': new FormControl(null),
      })
    );
    (<FormArray>this.questionnaireForm.get('questions')).push(new FormGroup({
        'question': new FormControl(null),
        'questionType': new FormControl(null)
      })
    );
    if (this.questionnaireSegmentsArray.value.length == 1) {
      this.toastService.show('U heeft een segment toegevoegd', {classname: 'bg-success text-light', delay: 3000});
    }
  }

  deleteSegment(index: number) {
    (<FormArray>this.questionnaireForm.get('segments')).removeAt(index);

    if (this.questionnaireSegmentsArray.value.length == 0) {
      this.toastService.show('U heeft alle segmenten verwijderd', {classname: 'bg-danger  text-light', delay: 3000});
    }
    if (this.questionnaireSegmentsArray.value.length == 0) {
      this.questionnaireQuestionsArray.clear();
    }
  }

  get questionControls(){
    return (<FormArray>this.questionnaireForm.get('questions')).controls;
  }

  addQuestion() {
    (<FormArray>this.questionnaireForm.get('questions')).push(new FormGroup({
        'question': new FormControl(null),
        'questionType': new FormControl(null)
      })
    );
  }

  deleteQuestion(index: number) {
    (<FormArray>this.questionnaireForm.get('questions')).removeAt(index);
  }

  createQuestionnaire() {
    this.toastService.show('We zijn om een vragenlijst aan te maken!', {classname: 'bg-info text-light', delay: 3000});

    this.http.put('/questionnaire', {
      name: this.questionnaireForm.value.questionnaireName,
      description: this.questionnaireForm.value.questionnaireDescription,
      userName: this.questionnaireForm.value.userName,
      date: this.questionnaireForm.value.questionnaireDate,
      questionnaireSegments: this.questionnaireForm.value.segments,
      questionnaireQuestions: this.questionnaireForm.value.questions
    })
      .subscribe({
        next: () => {
          this.toastService.show('Vragenlijst is aangemaakt', {classname: 'bg-info text-light', delay: 3000});
        }
      });
  }
}

