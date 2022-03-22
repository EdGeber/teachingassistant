import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { ErrorSource, ErrorHandlers } from './utils';
import { Student } from './student';
import { StudentService} from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = "ta-gui";
    
    // private properties
    private readonly _ERROR_HANDLING: Record<ErrorSource, ErrorHandlers> = {
        TRS: {  // see StudentService.CODE.TRS
            1: () => {  // duplicate SSN
                this.is_ssn_duplicate = true;
            },
        },
        TUS: {
            1: () => {  // student not found
                alert("Error: student not found.")
            }
        }
    }
    constructor(private _studentService: StudentService) {}

    // public properties
    public student = new Student();
    get students(): Student[] { return this._studentService.students; }
    public is_ssn_duplicate = false;


    // private methods
    private _handleError(source: string, code: number) {
        this._ERROR_HANDLING[source][code]();
    }

    // public methods
    public registerStudent(): void {
        let code = this._studentService.tryRegisterStudent(this.student);
        if(code == StudentService.CODE.TRS.OK)
            this.student = new Student();
        else this._handleError("TRS", code);
    }

    public updateStudent(s: Student): void {
        let code = this._studentService.tryUpdateStudent(s);
        // nothing else needs to be done if the update was successful
        if(code != StudentService.CODE.TUS.OK)
            this._handleError("TUS", code);
    }

    public removeDuplicateSsnWarning(): void {
        this.is_ssn_duplicate = false;
    }
}
