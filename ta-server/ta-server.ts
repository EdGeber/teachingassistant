import express from "express";

var taServer = express();

var students = [
    {name: 'Paulo',  ssn: '683', email: 'phmb@cin.br', goals: {'requirements': 'MA',  'tests': 'MA' }},
    {name:'Mariana', ssn: '456', email: '@mcb@cin.br', goals: {'requirements': 'MPA', 'tests': 'MPA'}}
];

taServer.get('/', (req, res) => res.send(students))

taServer.listen(3000, () => console.log('Example app listening on port 3000!'))
