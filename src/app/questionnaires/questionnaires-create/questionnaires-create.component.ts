import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../shared/toast/toast-service';
import { ErrorModel } from 'src/app/shared/error.model';

@Component({
  selector: 'app-questionnaires-create',
  templateUrl: './questionnaires-create.component.html',
  styleUrls: ['./questionnaires-create.component.scss'],
})
export class QuestionnairesCreateComponent {
  questionnaireForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    segments: new FormArray([]),
  });

  loading = false;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {}

  addSegment() {
    const segments = this.questionnaireForm.get('segments') as FormArray;
    const newSegment = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      questions: this.formBuilder.array([]),
    });
    segments.push(newSegment);

    this.toastService.show('Segment is toegevoegd', {
      classname: 'bg-success text-light',
      delay: 3000,
    });
  }

  addQuestion(segmentIndex: number) {
    const questions = this.getControlsFromSegment(segmentIndex);
    const newQuestion = this.formBuilder.group({
      label: ['', Validators.required],
      options: [''],
    });
    questions.push(newQuestion);
  }

  deleteSegment(index: number) {
    (<FormArray>this.questionnaireForm.get('segments')).removeAt(index);

    this.toastService.show('Segment ' + index + ' is verwijderd!', {
      classname: 'bg-danger  text-light',
      delay: 3000,
    });
  }

  deleteQuestionFromSegment(segmentIndex: number, questionIndex: number) {
    const selectedSegment = (<FormArray>this.questionnaireForm.get('segments'))
      .controls[segmentIndex];
    const questions = <FormArray>selectedSegment.get('questions');
    questions.removeAt(questionIndex);

    this.toastService.show('De vraag is succesvol verwijderd', {
      classname: 'bg-danger  text-light',
      delay: 3000,
    });
  }

  clearForm() {
    if (this.questionnaireForm.valid) {
      this.questionnaireForm.reset();

      this.toastService.show('Het formulier is leeggemaakt', {
        classname: 'bg-info text-light',
        delay: 3000,
      });
    } else {
      this.toastService.show('U heeft niet alle velden ingevuld', {
        classname: 'bg-danger text-light',
        delay: 3000,
      });
    }
  }

  clearAlleSegmenten() {
    if (this.questionnaireForm.get('segments') != null) {
      (<FormArray>this.questionnaireForm.get('segments')).clear();
      this.toastService.show('U heeft alle segmenten verwijderd', {
        classname: 'bg-info  text-light',
        delay: 3000,
      });
    } else {
      this.toastService.show('U heeft geen segmenten om te verwijderen', {
        classname: 'bg-danger text-light',
        delay: 3000,
      });
    }
  }

  getControlsFromSegment(segmentIndex: number) {
    const segment = (this.questionnaireForm.get('segments') as FormArray).at(
      segmentIndex
    ) as FormGroup;
    const questions = segment.get('questions') as FormArray;
    return questions;
  }

  createQuestionnaire() {
    this.toastService.show('We zijn bezig om een vragenlijst aan te maken', {
      classname: 'bg-info text-light',
      delay: 3000,
    });

    this.loading = true;

    this.questionnaireForm.value.segments?.forEach((segment: any) => {
      segment.questions.forEach((question: any) => {
        question.options = question.options.split('\n');
      });
    });
    
    this.http.put('/questionnaire/', this.questionnaireForm.value).subscribe({
      next: () => {
        this.toastService.show('✅ - Vragenlijst is aangemaakt!', {
          classname: 'bg-success text-light',
          delay: 3000,
        });

        this.loading = false;
        this.questionnaireForm.reset();
      },
      error: (error) => {
        this.toastService.show('❌ - ' + ErrorModel.errorMap.get(error) || "Onbekende fout opgetreden, probeer het later opnieuw", {
          classname: 'bg-danger text-light',
          delay: 3000,
        });

        this.loading = false;
      },
    });
  }
}
