import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { lastValueFrom, Observable } from 'rxjs';

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

    // public properties
    public student = new Student();
    public students!: Student[];
    public is_ssn_duplicate = false;


    // private methods
    private _handleError(source: string, code: number) {
        this._ERROR_HANDLING[source][code]();
    }

    // public methods
    constructor(private _studentService: StudentService) {}

    public async ngOnInit() {
        this.students = await lastValueFrom(this._studentService.students);
    }

    public async registerStudent() {
        var res: {code: number} = await
            lastValueFrom(this._studentService.tryRegisterStudent(this.student))

        if(res.code == StudentService.CODE.TRS.OK) {
            this.students.push(this.student);
            this.student = new Student();
        }
        else this._handleError("TRS", res.code);
    }

    public removeDuplicateSsnWarning(): void {
        this.is_ssn_duplicate = false;
    }
}
