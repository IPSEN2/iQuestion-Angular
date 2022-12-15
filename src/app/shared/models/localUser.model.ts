import { User } from "./user.model";

export class LocalUser {
    user!: User;
    token: string;

    constructor(token: string) {
        this.token = token;
    }
}