import { Segment } from "./segment.model";
import { User } from "./user.model";

export class Questionnaire {
    id: string;
    name: string;
    segments: Segment[];
    timestamp: number;
    author: User;

    constructor(id: string, name: string, segments: Segment[], timestamp: number, author: User) {
        this.id = id;
        this.name = name;
        this.segments = segments;
        this.timestamp = timestamp;
        this.author = author;
    }
}