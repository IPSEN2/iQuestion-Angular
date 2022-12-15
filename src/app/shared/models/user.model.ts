export class User {
    id: string;
    name: string;
    email: string;
    organization: string;
    enabled: boolean;
    role: string;

    constructor(id: string, name: string, email: string, organization: string, enabled: boolean, role: string, token: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.organization = organization;
        this.enabled = enabled;
        this.role = role;
    }
}