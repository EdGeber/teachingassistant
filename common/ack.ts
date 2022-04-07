import { Student } from "./student";

export interface ErrorHandlers { [index: number]: () => void }

export class Ack<T = void> {  // the void makes the type parameter optional
    constructor(public src: string, public code: number, public body?: T) {}
}

export const ACK = {
    OK: 0,

    TRS: { // 1 to 99
        OK:                new Ack("TRS", 0),
        DUPLICATE_SSN:     new Ack("TRS", 1),
    },

    TUS: { // 100 to 199
        OK:                new Ack("TUS", 0),
        STUDENT_NOT_FOUND: new Ack("TUS", 100),
    },

    getStudents: {
        OK: new Ack<Student[]>("getStudents", 0),
    }
}
