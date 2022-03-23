import { Injectable } from '@angular/core';
import { Student } from './student';
import { DeepClone } from './utils';

@Injectable()
export class StudentService {
    // private properties
    private _students: Student[] = [];

    // public properties
    get students(): Student[] {
        return DeepClone(this._students);
    }
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
        return this._students.find((s: Student) => s.ssn == ssn) != undefined;
    }

    private getStudentIndex(s: Student): number {
        return this._students.findIndex((t: Student) => t.ssn == s.ssn)
    }

    public tryRegisterStudent(s: Student): number {
        s = s.clone();

        if(this._ssnIsDuplicate(s.ssn))
            return StudentService.CODE.TRS.DUPLICATE_SSN;

        this._students.push(s);
        return StudentService.CODE.TRS.OK;
    }

    public tryUpdateStudent(updatedStudent: Student): number {
        updatedStudent = updatedStudent.clone();

        let studentIndex = this.getStudentIndex(updatedStudent);
        if(studentIndex == -1) return StudentService.CODE.TUS.STUDENT_NOT_FOUND;

        this._students[studentIndex] = updatedStudent;
        return StudentService.CODE.TUS.OK;
    }
}