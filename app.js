var express = require('express');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 1337;
const fs = require('fs');
const jsonFile = "./db/db.txt";
const readJSON = () => {
    let rawdata = fs.readFileSync(jsonFile);
    return JSON.parse(rawdata);
};

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/api/v1/todos', (req, res) => {
    var todos = readJSON().map(el => el.description);
    res.send(todos);
});

app.get('/api/v1/todos/:id', (req, res) => {
    console.log(req.params);
    var oneTask = readJSON().find((oneTask) => {
        return oneTask.id === Number(req.params.id)
    });
    res.send(oneTask)
});

app.post('/api/v1/todos', (req,res) => {
    var newToDo = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description
    };
    var dbc = readJSON();
    dbc.push(newToDo);
    console.log(dbc);
    fs.writeFileSync('./db/db.txt', JSON.stringify(dbc));
    res.sendStatus(200);
});

app.put('/api/v1/todos/:id', (req, res) => {
    var arr = readJSON();
    var patchTask = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description
    };
    var added = false;
    for(var i=0;i<arr.length; i++){
        if(arr[i].id === patchTask.id){
            arr.splice(i,1,patchTask);
            added = true;
            break;
        }
    }
    fs.writeFileSync('./db/db.txt', JSON.stringify(arr));
    res.sendStatus(200);
});

app.delete('/api/v1/todos/:id', (req, res) => {
    var clearArr = readJSON().filter((deleteTask) => {
        return deleteTask.id !== Number(req.params.id)
    });
    fs.writeFileSync('./db/db.txt', JSON.stringify(clearArr));
    res.sendStatus(200);
});

app.listen(process.env.PORT || PORT, () => {
    console.log('API starter')
});
