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
    }
    private _studentService = new StudentService();

    // public properties
    public student = new Student();
    get students(): Student[] { return this._studentService.students; }
    public is_ssn_duplicate = false;


    // private methods
    private _handleError(source: string, code: number) {
        this._ERROR_HANDLING[source][code]();
    }

    private removeDuplicateSsnWarning(): void {
        this.is_ssn_duplicate = false;
    }

    // public methods
    public registerStudent(): void {
        let code = this._studentService.tryRegisterStudent(this.student);
        if(code == StudentService.CODE.TRS.OK)
            this.student = new Student();
        else this._handleError("TRS", code);
    }

    public onMouseMove(): void {
        this.removeDuplicateSsnWarning();
    }
}
