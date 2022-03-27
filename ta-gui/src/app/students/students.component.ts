import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { ErrorSource, ErrorHandlers } from '../global-code/utils';
import { Student } from '../../../../common/student';
import { StudentService} from '../global-code/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './students.component.html',
  styleUrls: ['../../styles.css', './students.component.css']
})

export class StudentsComponent implements OnInit {    
    // private properties
    private readonly _ERROR_HANDLING: Record<ErrorSource, ErrorHandlers> = {
        TRS: {  // see StudentService.CODE.TRS
            1: () => {  // duplicate SSN
                this.is_ssn_duplicate = true;
            },
        }
    }
    constructor(private _studentService: StudentService) {}

    // public properties
    public student = new Student();
    public students!: Student[];
    public is_ssn_duplicate = false;


    // private methods
    private _handleError(source: string, code: number) {
        this._ERROR_HANDLING[source][code]();
    }

    // public methods
    public ngOnInit(): void {
        this.students = this._studentService.students;
    }

    public registerStudent(): void {
        let code = this._studentService.tryRegisterStudent(this.student);
        if(code == StudentService.CODE.TRS.OK) {
            this.students.push(this.student);
            this.student = new Student();
        }
        else this._handleError("TRS", code);
    }

    public removeDuplicateSsnWarning(): void {
        this.is_ssn_duplicate = false;
    }
}
