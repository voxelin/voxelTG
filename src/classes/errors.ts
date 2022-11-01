export class CommandHandlerError implements Error {
    name: string;
    message: string;
    stack?: string | undefined;
    constructor(message: string) {
        this.name = "CommandHandlerError";
        this.message = message;
    }
}
