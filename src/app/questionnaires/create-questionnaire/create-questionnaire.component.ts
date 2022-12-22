import { Component } from '@angular/core';

@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.scss']
})

export class CreateQuestionnaireComponent {

  constructor() {

  }

  vraagToevoegen() {
    console.log('Vraag toegevoegd');
  }

  vraagVerwijderen() {
    console.log('Vraag verwijderd');
  }
}
