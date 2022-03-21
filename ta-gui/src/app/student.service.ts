import { Student } from './student';

export class StudentService {
    public static readonly CODE = {
        TRS: {
            OK: 0,
            DUPLICATE_SSN: 1,
        }
    }
    public students: Student[] = [];

    private _ssnIsDuplicate(ssn: string) {
        return this.students.find((s: Student) => s.ssn == ssn) != undefined;
    }

    public tryRegisterStudent(s: Student): number {
        if(this._ssnIsDuplicate(s.ssn))
            return StudentService.CODE.TRS.DUPLICATE_SSN;

        this.students.push(s);
        return StudentService.CODE.TRS.OK;
    }
}