import { QuestionnaireAuthor } from "./questionnaire-author";
import { Segment } from "./segment.model";

export class Questionnaire {
    id: string;
    name: string;
    segments: Segment[];
    timestamp: number;
    author: QuestionnaireAuthor
    entryCount: number;
    lastEntryTimestamp: number;

    constructor(id: string, name: string, segments: Segment[], timestamp: number, author: QuestionnaireAuthor, entryCount: number, lastEntryTimestamp: number) {
        this.id = id;
        this.name = name;
        this.segments = segments;
        this.timestamp = timestamp;
        this.author = author;
        this.entryCount = entryCount;
        this.lastEntryTimestamp = lastEntryTimestamp;
    }
}