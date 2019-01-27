var express = require('express');
var bodyParser = require('body-parser');

//import express from 'express';
//import bodyParser from 'body-parser';

const PORT = 5555;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/api/v1/todos', (req, res) => {
    res.send(readJSON());
//    readJSON();
});

app.get('/api/v1/todos/:id', (req, res) => {
    console.log(req.params);
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    });
    res.send(artist.name)
});



app.listen(PORT, function () {
    console.log('API starter')
});
