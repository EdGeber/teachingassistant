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
    student = new Student();
    studentService = new StudentService();

    register(s: Student): void {
        this.studentService.register(s);
        this.student = new Student();
    }
}
