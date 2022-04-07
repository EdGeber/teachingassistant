import { DeepCloneProperties } from "../ta-gui/src/app/global-code/utils";

export class Student {
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
    static fromAny(from: any): Student {
        let s = new Student();
        for(let key in from) (s as any)[key] = from[key];
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
