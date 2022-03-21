import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { Student } from './student';
import { StudentService} from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    private _TRS: { [index: number]: () => void } = {
        1: () => {
            this.student.ssn = "";
        }
    }
    private _studentService = new StudentService();

    public student = new Student();
    get students(): Student[] {
        return this._studentService.students;
    }


    private _handleRegisterStudentError(code: number) {
        this._TRS[code]();
    }

    public registerStudent(): void {
        let code = this._studentService.tryRegisterStudent(this.student);
        if(code == StudentService.CODE.TRS.OK)
            this.student = new Student();
        else this._handleRegisterStudentError(code);
    }
}
