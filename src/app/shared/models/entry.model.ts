import { FormGroup } from "@angular/forms";
import { Answer } from "./answer.model";

export class Entry {
    id: string | undefined;
    questionnaire: String;
    caregiver: String | undefined;
    answers: Answer[];
    timestamp: number | undefined;

    constructor(id: string, questionnaire: String, caregiver: String, answers: Answer[], timestamp: number) {
        this.id = id;
        this.questionnaire = questionnaire;
        this.caregiver = caregiver;
        this.answers = answers;
        this.timestamp = timestamp;
    }

    public static fromForm(form: FormGroup) {
        
    }
}