import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map} from 'rxjs/operators';
import { Student } from '../../../../common/student';

@Injectable()
export class StudentService {
    // static private properties
    private static readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    private static readonly taURLs = {
        root: 'http://localhost:3000/',
        students: 'http://localhost:3000/students',
    }

    // static public properties
    public static readonly CODE = {
        TRS: {
            OK: 0,
            DUPLICATE_SSN: 1,
        },
        TUS: {
            OK: 0,
            STUDENT_NOT_FOUND: 1,
        }
    }

    // non-static private methods

    // non-static public methods
    constructor(private http: HttpClient) { }


    // non-static private properties
 // private http: HttpClient; (declared in the constructor)

    // non-static public properties
    get students(): Observable<Student[]> {
        return this.http
            .get<any[]>(StudentService.taURLs.students)
            .pipe(retry(2), map(anyArray => anyArray.map((s) => Student.fromAny(s))));
    }

    // non-static private methods

    // non-static public methods
    public tryRegisterStudent(newStudent: Student): Observable<{"code": number}> {
        return this.http.post<{"code": number}>(
            StudentService.taURLs.students,
            newStudent,
            {headers: StudentService.headers})
            .pipe(retry(2));
    }

    public tryUpdateStudent(updatedStudent: Student): Observable<{"code": number}> {
        return this.http.put<{"code": number}>(
            StudentService.taURLs.students,
            updatedStudent,
            {headers: StudentService.headers})
            .pipe(retry(2));
    }
}
