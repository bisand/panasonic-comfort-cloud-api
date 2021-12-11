export class LoginRequest {
    public language: number;
    public loginId: string;
    public password: string;

    constructor(username: string, password: string) {
        this.language = 0;
        this.loginId = username;
        this.password = password;
    }
}
