export class Answer { 
    public id: string | undefined;
    public question: string;
    public result: string;
    public comment: string;

    constructor(id: string, question: string, result: string, comment: string) {
        this.id = id;
        this.question = question;
        this.result = result;
        this.comment = comment;
    }
}