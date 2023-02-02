import {Answer} from "./answer.model";

export class EntryDto {
  id: string;
  questionnaireId: String;
  questionnaireName: String;
  authorId: String;
  answers: Answer[];
  timestamp: number;

  constructor(id: string, questionnaireId: String, questionnaireName: String, authorId: String, answers: Answer[], timestamp: number) {
    this.id = id;
    this.questionnaireId = questionnaireId;
    this.questionnaireName = questionnaireName;
    this.authorId = authorId;
    this.answers = answers;
    this.timestamp = timestamp;
  }
}
