import { FormGroup } from "@angular/forms";
import { Answer } from "./answer.model";

export class Entry {
    id: string;
    questionnaireId: String;
    caregiverId: String;
    answers: Answer[];
    timestamp: number;

    constructor(id: string, questionnaireId: String, caregiverId: String, answers: Answer[], timestamp: number) {
        this.id = id;
        this.questionnaireId = questionnaireId;
        this.caregiverId = caregiverId;
        this.answers = answers;
        this.timestamp = timestamp;
    }

    public static fromForm(form: FormGroup) {
        
    }
}