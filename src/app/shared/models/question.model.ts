export class Question {
    id: string;
    label: string;
    options: string[];

    constructor(id: string, label: string, options: string[]) {
        this.id = id;
        this.label = label;
        this.options = options;
    }
}