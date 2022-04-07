import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map} from 'rxjs/operators';
import { Student } from '../../../../common/student';
import { Ack } from '../../../../common/ack';

@Injectable()
export class StudentService {
    // static private properties
    private static readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    private static readonly taURLs = {
        root: 'http://localhost:3000/',
        students: 'http://localhost:3000/students',
    }

    // non-static public methods
    constructor(private http: HttpClient) { }


    // non-static private properties
 // private http: HttpClient; (declared in the constructor)

    // non-static public properties
    get students(): Observable<Ack<Student[]>> {
        return this.http
            .get<Ack<Student[]>>(StudentService.taURLs.students)
            .pipe(retry(2));
    }

    // non-static public methods
    public tryRegisterStudent(newStudent: Student): Observable<Ack> {
        return this.http
            .post<Ack>(
                StudentService.taURLs.students,
                newStudent,
                {headers: StudentService.headers})
            .pipe(retry(2));
    }

    public tryUpdateStudent(updatedStudent: Student): Observable<Ack> {
        return this.http
            .put<Ack>(StudentService.taURLs.students,
                updatedStudent,
                {headers: StudentService.headers})
            .pipe(retry(2));
    }
}
