import express from "express";
import { Student } from "../common/student";
import { StudentRegistration } from "./StudentRegistration";

var taServer = express();

const studentRegistration = new StudentRegistration;

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taServer.use(allowCrossDomain);

taServer.use(express.json());


taServer.get('/students', (req, res) => res.send(JSON.stringify(studentRegistration.students)))

taServer.post('/students', (req, res) => {
    res.send({"code": studentRegistration.tryRegisterStudent(Student.fromAny(req.body))});
})

taServer.put('/students', (req, res) => {
    res.send({"code": studentRegistration.tryUpdateStudent(Student.fromAny(req.body))});
})

taServer.listen(3000, () => console.log('Example app listening on port 3000!'))
