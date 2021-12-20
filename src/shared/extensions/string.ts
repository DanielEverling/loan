import { Notification } from "../domain/notification"

declare global {
    interface String {
        isBlank(): boolean
        isEmpty(message: string): Notification
        exactLengt(expectedLengt: number, message: string)
        hasPattern(pattern: string, message: string): Notification
        validateSizeLessThan(expectedLengt: number, message: string): Notification
        generate(size: number): string
    }
}

String.prototype.isBlank = function() : boolean {
    return (this.length === 0)
}

String.prototype.isEmpty = function (message: string) : Notification {
    if (this.length === 0) {
        return Notification.of(message);
    }
    return Notification.empty()
}

String.prototype.hasPattern = function (pattern:string, message: string) : Notification {
    const regex = new RegExp(pattern)
    if (regex.test(this)) {
        return Notification.empty();
    }
    return Notification.of(message);
}

String.prototype.validateSizeLessThan = function (expectedLengt: number, message: string) : Notification {
    if (this.length > expectedLengt) {
        return Notification.of(message);
    }
    return Notification.empty();
}

String.prototype.exactLengt = function (expectedLengt: number, message: string) : Notification {
    if (this.length == expectedLengt) {
        return Notification.empty();
    }
    return Notification.of(message);
}

String.prototype.generate = function (size: number) : string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < size; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}