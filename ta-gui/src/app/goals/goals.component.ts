import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Student } from '../../../../common/student';
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
    public async ngOnInit() {
        this.students = await lastValueFrom(this._studentService.students);
    }

    public async updateStudent(s: Student) {
        var res: {code: number} = await
            lastValueFrom(this._studentService.tryUpdateStudent(s));

        if(res.code != StudentService.CODE.TUS.OK)
            this._handleError("TUS", res.code);
    }
}