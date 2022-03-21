import { Student } from './student';

export class StudentService {
    static readonly CODE = {
        TRS: {
            OK: 0,
            DUPLICATE_SSN: 1,
        }
    }

    students: Student[] = [];

    tryRegisterStudent(s: Student): number {
        if(this.students.find((t: Student) => t.ssn == s.ssn))
            return StudentService.CODE.TRS.DUPLICATE_SSN;

        this.students.push(s);
        return StudentService.CODE.TRS.OK;
    }
}