import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EntryService } from '../../service/api/entry.service';
import { QuestionnaireService } from '../../service/api/questionnaire.service';
import { EntryFormService } from '../../service/entry-form.service';
import { QuestionBase } from '../../shared/form/question-base';
import { Questionnaire } from '../../shared/models/questionnaire.model';
import { ToastService } from '../../shared/toast/toast-service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-questionnaire-fill',
  templateUrl: './questionnaire-fill.component.html',
})
export class QuestionnaireFillComponent {
  
}
