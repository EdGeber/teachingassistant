import express from "express";
import { Ack, ACK } from "../common/ack";
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


taServer.get('/students', (req, res) => {
    let ack = studentRegistration.ackedStudents;
    res.send(ack);
})

taServer.post('/students', (req, res) => {
    let ack = studentRegistration.tryRegisterStudent(Student.fromAny(req.body))
    res.send(ack);
})

taServer.put('/students', (req, res) => {
    let ack = studentRegistration.tryUpdateStudent(Student.fromAny(req.body));
    res.send(ack);
})

taServer.listen(3000, () => console.log('Example app listening on port 3000!'))
