export interface EntryDtoReceive {
  id: string;
  questionnaireId: string;
  questionnaireName: string;
  authorId: string;
  timestamp: number;
  answers: Answer[];
}

export interface Answer {
  id: string;
  question: Question;
  result: string;
  comment?: string;
}

export interface Question {
  id: string;
  label: string;
  type: string;
}
