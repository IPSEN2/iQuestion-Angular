import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.scss']
})

export class CreateQuestionnaireComponent {

  questionnaireQuestions = new FormArray([]);
  questionnaireSegments = new FormArray([]);

  questionnaireForm = new FormGroup({
    questionnaireName: new FormControl(null),
    questionnaireDescription: new FormControl(null),
    questionnaireDate: new FormControl(null),
    userName: new FormControl(null),
    questions: this.questionnaireQuestions,
    segments: this.questionnaireSegments
  })


  constructor(private fb: FormBuilder, private http: HttpClient) {

  }

  newQuantity(): FormGroup {
    return this.fb.group({
      vraag: '',
    })
  }

  get segmentControls(){
    return (<FormArray>this.questionnaireForm.get('segments')).controls;
  }

  addSegment() {
    (<FormArray>this.questionnaireForm.get('segments')).push(new FormGroup({
        'segments': new FormControl(null),
      })
    );
  }

  deleteSegment(index: number) {
    (<FormArray>this.questionnaireForm.get('segments')).removeAt(index);
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
    this.http.put('/questionnaire', {
      name: this.questionnaireForm.value["questionnaireName"],
      userName: this.questionnaireForm.value.userName,
      description: this.questionnaireForm.value.questionnaireDescription,
      date: this.questionnaireForm.value.questionnaireDate,
      // questions: this.questionnaireForm.value.questionnaireQuantities,
      // type: this.questionnaireForm.value.questionType
    })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
