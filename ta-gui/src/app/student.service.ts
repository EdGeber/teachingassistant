import { Student } from './student';

export class StudentService {
    students: Student[] = [];

    register(s: Student): void {
        this.students.push(s);
    }
}