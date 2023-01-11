import { Question } from "./question.model";

export class Segment {
    id: string;
    title: string;
    description: string;
    questions: Question[];

    constructor(id: string, title: string, description: string, questions: Question[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.questions = questions;
    }
}