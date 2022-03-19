import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    student = new Student();
}

export class Student {
    name  = "";
    ssn   = "";
    email = "";
}
