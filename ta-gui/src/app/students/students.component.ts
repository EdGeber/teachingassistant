import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { lastValueFrom, Observable } from 'rxjs';

import { Student } from '../../../../common/student';
import { StudentService} from '../global-code/student.service';
import { ErrorHandlers, Ack, ACK } from '../../../../common/ack';

@Component({
  selector: 'app-root',
  templateUrl: './students.component.html',
  styleUrls: ['../../styles.css', './students.component.css']
})

export class StudentsComponent implements OnInit {    
    // private properties
    private readonly _ERROR_HANDLING: ErrorHandlers = {};

    constructor(private _studentService: StudentService) {

        this._ERROR_HANDLING[ACK.TRS.DUPLICATE_SSN.code] =
            () => this.is_ssn_duplicate = true;

    }

    // public properties
    public student = new Student();
    public students!: Student[];
    public is_ssn_duplicate = false;


    // private methods
    private _handleError(ack: Ack) {
        this._ERROR_HANDLING[ack.code]();
    }

    /*
    private getStudentsFromAck(ackedStudents: Ack<Students[]>): Students[] {

    }*/

    // public methods
    public async ngOnInit() {
        let ack = await lastValueFrom(this._studentService.students)
        this.students = ack.body as Student[];
    }

    public removeDuplicateSsnWarning(): void {
        this.is_ssn_duplicate = false;
    }

    public async registerStudent() {
        var ack = await
            lastValueFrom(this._studentService.tryRegisterStudent(this.student));

        if(ack.code == ACK.OK) {
            this.students.push(this.student);
            this.student = new Student();
        }
        else this._handleError(ack);
    }
}
