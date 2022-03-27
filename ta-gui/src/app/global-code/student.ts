import { DeepCloneProperties } from "./utils";

export class Student{
    // public properties
    name    = "";
    gitName = "";
    ssn     = "";
    email   = "";
    goals: Record<string, string> = {
        "Requirements": "",
        "Tests":        "",
    };

    // wtf man constructor overloading is not allowed...
    static fromJSON(studentJSON: string): Student {
        let from: any = JSON.parse(studentJSON);
        let s = new Student();
        for(let key in from) s[key] = from[key];
        return s;
    }

    // public methods
    clone(): Student {
        let cloned = new Student();
        let studentData = DeepCloneProperties(this);
        for(let key in studentData) (cloned as any)[key] = studentData[key];
        return cloned;
    }

}
