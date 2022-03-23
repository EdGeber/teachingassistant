import { DeepClone } from "./utils";

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

    // public methods
    clone(): Student { return DeepClone(this); }

}
