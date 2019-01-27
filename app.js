const fs = require('fs');
const jsonFile = "./db/db.txt";

var express = require('express');
var bodyParser = require('body-parser');

const readJSON = () => {
    let rawdata = fs.readFileSync(jsonFile);
    return JSON.parse(rawdata);
};

const PORT = 5555;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/api/v1/todos', (req, res) => {
    var todos = readJSON().map(el => el.description);
    res.send(todos);
});

app.get('/api/v1/todos/:id', (req, res) => {
    console.log(req.params);
    var oneTask = readJSON().find(function (oneTask) {
        return oneTask.id === Number(req.params.id)
    });
    res.send(oneTask)
});

app.post('/api/v1/todos', function (req,res) {
    var newToDo = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description
    };
    var dbc = readJSON();
    dbc.push(JSON.stringify(newToDo));
//    var noja = JSON.stringify(newToDo);
    console.log(dbc);
    fs.writeFileSync('./db/db.txt', dbc);
//    readJSON().push(newToDo);
//    console.log(req.body);
    res.send('Success!')
});

app.listen(PORT, function () {
    console.log('API starter')
});
