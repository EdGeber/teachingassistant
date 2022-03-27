import { Student } from "../common/student";

export class StudentRegistration {
    // private properties
    public students: Student[] = [];

    // public properties
    public static readonly CODE = {
        TRS: {
            OK: 0,
            DUPLICATE_SSN: 1,
        },
        TUS: {
            OK: 0,
            STUDENT_NOT_FOUND: 1,
        }
    }


    private _ssnIsDuplicate(ssn: string) {
        return this.students.find((s: Student) => s.ssn == ssn) != undefined;
    }

    private getStudentIndex(s: Student): number {
        return this.students.findIndex((t: Student) => t.ssn == s.ssn)
    }

    public tryRegisterStudent(s: Student): number {
        s = s.clone();

        if(this._ssnIsDuplicate(s.ssn))
            return StudentRegistration.CODE.TRS.DUPLICATE_SSN;

        this.students.push(s);
        return StudentRegistration.CODE.TRS.OK;
    }

    public tryUpdateStudent(updatedStudent: Student): number {
        updatedStudent = updatedStudent.clone();

        let studentIndex = this.getStudentIndex(updatedStudent);
        if(studentIndex == -1) return StudentRegistration.CODE.TUS.STUDENT_NOT_FOUND;

        this.students[studentIndex] = updatedStudent;
        return StudentRegistration.CODE.TUS.OK;
    }
}
