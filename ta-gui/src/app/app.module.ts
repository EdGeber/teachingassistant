import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HeadComponent } from './head/head.component';
import { GoalsComponent } from './goals/goals.component';
import { StudentsComponent } from './students/students.component';
import { StudentService } from './global-code/student.service';

@NgModule({
  declarations: [
    HeadComponent,
    StudentsComponent,
    GoalsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
        {
            path: 'goals',
            component: GoalsComponent
        },
        {
            path: 'students',
            component: StudentsComponent
        }
    ])
  ],
  providers: [StudentService],
  bootstrap: [HeadComponent]
})
export class AppModule { }
