export class Notification {
    private constructor(readonly value: string) {}

    static of(value: string) : Notification {
        return new Notification(value)
    }

    static empty(): Notification {
        return new Notification('')
    } 
}