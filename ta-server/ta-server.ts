import express from "express";
import { Student } from "../common/student";
import { StudentRegistration } from "./StudentRegistration";

var taServer = express();

const studentRegistration = new StudentRegistration;

taServer.use(express.json());


taServer.get('/', (req, res) => res.send(JSON.stringify(studentRegistration.students)))

taServer.post('/students', (req, res) => {
    res.send({"code": studentRegistration.tryRegisterStudent(Student.fromAny(req.body))});
})

taServer.put('/students', (req, res) => {
    res.send({"code": studentRegistration.tryUpdateStudent(Student.fromAny(req.body))});
})

taServer.listen(3000, () => console.log('Example app listening on port 3000!'))
