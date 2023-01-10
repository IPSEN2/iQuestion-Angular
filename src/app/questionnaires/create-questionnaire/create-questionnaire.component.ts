import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray} from '@angular/forms';
@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.scss']
})

export class CreateQuestionnaireComponent {

  name = 'Angular';

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      quantities: this.fb.array([])
    });
  }

  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      vraag: '',
      antwoord: ''
    })
  }

  addQuestion() {
    this.quantities().push(this.newQuantity());
    console.log('Vraag toegevoegd');
  }

  deleteQuestion(i:number) {
    this.quantities().removeAt(i);
    console.log('Vraag verwijderd');
  }

  createQuestionnaire() {
    console.log(this.productForm.value);
  }
}
