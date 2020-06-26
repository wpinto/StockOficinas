var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var stocks = require('./stocks');
var usuarios = require('./usuarios');
var oficinas = require('./oficinas');
var recursos = require('./recursos');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
//mysql
global.connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'stockusr',
    password: 'arqweb2020',
    database: 'stock'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Connectado con id ' + connection.threadId);
});

//api
app.use('/stocks', stocks);
app.use('/usuarios', usuarios);
app.use('/oficinas', oficinas);
app.use('/recursos', recursos);

app.use(function (req, res, next) {
    res.status(404).send("La direccion del request no existe");
});

app.listen(8080, function () {
    console.log('App funcionando en puerto 8080!');
});
