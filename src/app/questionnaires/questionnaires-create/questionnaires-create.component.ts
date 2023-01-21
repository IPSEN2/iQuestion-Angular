import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {ToastService} from "../../shared/toast/toast-service";

@Component({
  selector: 'app-questionnaires-create',
  templateUrl: './questionnaires-create.component.html',
  styleUrls: ['./questionnaires-create.component.scss']
})

export class QuestionnairesCreateComponent {

  questionnaireQuestionsArray = new FormArray([]);
  questionnaireSegmentsArray = new FormArray([]);
  selectedSegmentIndex = 0;

  questionnaireForm = new FormGroup({
    questionnaireName: new FormControl(null, Validators.required),
    questionnaireDescription: new FormControl(null, Validators.required),
    questionnaireDate: new FormControl(null, Validators.required),
    userName: new FormControl(null, Validators.required),
    segments: this.questionnaireSegmentsArray,
    questions: this.questionnaireQuestionsArray,
    questionnaireType: new FormControl(null)
  })

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastService: ToastService,
  ) {
  }

  addNewSegment() {
    const newSegment = new FormGroup({
      'segments': new FormControl(null),
      'questions': new FormArray([])
    });
    (<FormArray>this.questionnaireForm.get('segments')).push(newSegment);
    if (this.questionnaireSegmentsArray.value.length == 1) {
      this.toastService.show('Segment is toegevoegd',
        {classname: 'bg-success text-light',
          delay: 3000});
    }
  }

  addQuestion() {
    const selectedSegment = (<FormArray>this.questionnaireForm.get('segments')).controls[this.selectedSegmentIndex];
    const questions = <FormArray>selectedSegment.get('questions');
    questions.push(new FormGroup({
      'question': new FormControl(null),
      'questionnaireType': new FormControl(null)
    }));
  }

  deleteSegment(index: number) {
    (<FormArray>this.questionnaireForm.get('segments')).removeAt(index);

    if (this.questionnaireSegmentsArray.value.length == 0) {
      this.toastService.show('U heeft alle segmenten verwijderd',
        {classname: 'bg-danger  text-light',
          delay: 3000});
    }
    if (this.questionnaireSegmentsArray.value.length == 0) {
      this.questionnaireQuestionsArray.clear();
    }
  }

  deleteQuestion(index: number) {
    (<FormArray>this.questionnaireForm.get('questions')).removeAt(index);

    if (this.questionnaireQuestionsArray.value.length == 0) {
      this.toastService.show('U heeft alle vragen verwijderd',
        {classname: 'bg-danger  text-light',
          delay: 3000});
    }
  }

  get questionControls(){
    return (<FormArray>this.questionnaireForm.get('questions')).controls;
  }

  clearForm() {
    if (this.questionnaireForm.valid){
      this.questionnaireForm.reset();
      this.questionnaireQuestionsArray.clear();
      this.questionnaireSegmentsArray.clear();

      this.toastService.show('Het formulier is leeggemaakt',
        {classname: 'bg-info text-light',
          delay: 3000});
    } else {
      this.toastService.show('U heeft niet alle velden ingevuld',
        {classname: 'bg-danger text-light',
          delay: 3000});
    }
  }

  clearAlleSegmenten() {
    if (this.questionnaireSegmentsArray.value.length != 0) {
      this.toastService.show('U heeft alle segmenten verwijderd',
        {
          classname: 'bg-info  text-light',
          delay: 3000
        });
      this.questionnaireSegmentsArray.clear();
    } else {
      this.toastService.show('U heeft geen segmenten om te verwijderen',
        {classname: 'bg-danger text-light',
          delay: 3000});
    }

  }

  get segmentControls(){
    return (<FormArray>this.questionnaireForm.get('segments')).controls;
  }

  createQuestionnaire() {
    this.toastService.show('We zijn om een vragenlijst aan te maken!',
      {classname: 'bg-info text-light',
        delay: 3000});

    this.http.put('/questionnaire', {
      name: this.questionnaireForm.value.questionnaireName,
      description: this.questionnaireForm.value.questionnaireDescription,
      userName: this.questionnaireForm.value.userName,
      date: this.questionnaireForm.value.questionnaireDate,
      questionnaireSegments: this.questionnaireForm.value.segments,
      questionnaireQuestions: this.questionnaireForm.value.questions,
      type: this.questionnaireForm.value.questionnaireType
    })
      .subscribe({
        next: () => {
          this.toastService.show('Vragenlijst is aangemaakt',
            {classname: 'bg-info text-light',
              delay: 3000});
        }
      });
  }

    // addQuestion() {
    //   (<FormArray>this.questionnaireForm.get('questions')).push(new FormGroup({
    //       'question': new FormControl(null),
    //       'questionnaireType': new FormControl(null)
    //     })
    //   );
    // }

    // (<FormArray>this.questionnaireForm.get('segments')).push(new FormGroup({
    //     'segments': new FormControl(null),
    //   })
    // );
    // (<FormArray>this.questionnaireForm.get('questions')).push(new FormGroup({
    //     'question': new FormControl(null),
    //     'questionnaireType': new FormControl(null)
    //   })
    // );
  question: any;
}
