export class ErrorModel {
    private message: string;
    private code: string;
    private category: string;
    private status: number;

    constructor(status: number, code: string, category: string, message: string) {
        this.status = status;
        this.code = code;
        this.category = category;
        this.message = message;
    }
}