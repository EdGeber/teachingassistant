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

    // public methods
    clone(): Student {
        let cloned = new Student();
        let studentData = DeepCloneProperties(this);
        for(let key in studentData) (cloned as any)[key] = studentData[key];
        return cloned;
    }

}
