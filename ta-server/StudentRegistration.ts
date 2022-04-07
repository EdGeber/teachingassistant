import { Student } from "../common/student";
import { Ack, ACK } from "../common/ack";

export class StudentRegistration {
    public readonly students: Student[] = [];

    get ackedStudents(): Ack<Student[]> {
        let ack: Ack<Student[]> = ACK.getStudents.OK;
        ack.body = this.students;
        return ack;
    }


    private _ssnIsDuplicate(ssn: string) {
        return this.students.find((s: Student) => s.ssn == ssn) != undefined;
    }

    private _getStudentIndex(s: Student): number {
        return this.students.findIndex((t: Student) => t.ssn == s.ssn)
    }

    public tryRegisterStudent(s: Student): Ack {
        const src = "TRS";

        s = s.clone();

        if(this._ssnIsDuplicate(s.ssn))
            return ACK.TRS.DUPLICATE_SSN;

        this.students.push(s);
        return ACK.TRS.OK;
    }

    public tryUpdateStudent(updatedStudent: Student): Ack {     

        updatedStudent = updatedStudent.clone();

        let studentIndex = this._getStudentIndex(updatedStudent);
        if(studentIndex == -1)
            return ACK.TUS.STUDENT_NOT_FOUND;

        this.students[studentIndex] = updatedStudent;
        return ACK.TUS.OK;
    }
}
