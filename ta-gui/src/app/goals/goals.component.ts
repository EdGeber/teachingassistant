import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Ack, ACK, ErrorHandlers } from '../../../../common/ack';
import { Student } from '../../../../common/student';
import { StudentService } from '../global-code/student.service';

@Component({
  selector: 'goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})

export class GoalsComponent implements OnInit {
    // private properties
    private readonly _ERROR_HANDLING: ErrorHandlers = {};

    constructor(private _studentService: StudentService) {

        this._ERROR_HANDLING[ACK.TUS.STUDENT_NOT_FOUND.code] =
            () => alert("Error: student not found.");

    }

    // public properties
    public students!: Student[];

    // private methods
    private _handleError(ack: Ack) {
        this._ERROR_HANDLING[ack.code]();
    }

    // public methods
    public async ngOnInit() {
        let ack = await lastValueFrom(this._studentService.students)
        this.students = ack.body as Student[];
    }

    public async updateStudent(s: Student) {
        var ack = await
            lastValueFrom(this._studentService.tryUpdateStudent(s));

        if(ack.code != ACK.OK)
            this._handleError(ack);
    }
}
