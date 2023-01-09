export class Answer { 
    public id: string;
    public questionId: string;
    public result: string;
    public comment: string;

    constructor(id: string, questionId: string, result: string, comment: string) {
        this.id = id;
        this.questionId = questionId;
        this.result = result;
        this.comment = comment;
    }
}