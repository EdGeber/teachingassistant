import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Student } from '../global-code/student';
import { StudentService } from '../global-code/student.service';
import { ErrorSource, ErrorHandlers } from '../global-code/utils';

@Component({
  selector: 'app-root',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})

export class GoalsComponent implements OnInit {
    // private properties
    private readonly _ERROR_HANDLING: Record<ErrorSource, ErrorHandlers> = {
        TUS: {
            1: () => {  // student not found
                alert("Error: student not found.")
            }
        }
    }
    constructor(private _studentService: StudentService) {}

    // public properties
    public students!: Student[];

    // private methods
    private _handleError(source: string, code: number) {
        this._ERROR_HANDLING[source][code]();
    }

    // public methods
    public ngOnInit(): void {
        this.students = this._studentService.students;
    }

    public updateStudent(s: Student): void {
        let code = this._studentService.tryUpdateStudent(s);
        // nothing else needs to be done if the update was successful
        if(code != StudentService.CODE.TUS.OK)
            this._handleError("TUS", code);
    }
}