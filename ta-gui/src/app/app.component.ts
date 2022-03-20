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
    _studentService = new StudentService();

    student = new Student();
    get students(): Student[] {
        return this._studentService.students;
    }


    register(s: Student): void {
        this._studentService.register(s);
        this.student = new Student();
    }
}
