var express = require('express');
var router = express.Router();
var app = express();
module.exports = router;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Content-Type");
       res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
          next();
    });
//api

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let query = "SELECT idusuario, nombre, mail FROM `usuario` ORDER BY idusuario ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
         res.send(result);
    
        });
});

router.post('/', async (req, res) => {
    let nombre = req.body.nombre;
    let mail = req.body.mail;
    let query = "INSERT INTO `usuario` (nombre, mail) VALUES('" + nombre + "','" + mail + "')";
    connection.query(query, (err, result) => {
            if (err) {
                res.send(err);
            };
            res.send("inserado usuario " + nombre);
        });
});


router.get('/:idusuario', async (req, res) => {
    let query = "SELECT * FROM `usuario` WHERE idusuario=" + req.params.idusuario;
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});


router.put('/:idusuario', async (req, res) => {
    let nombre = req.body.nombre;
    let mail = req.body.mail;
    let query = "UPDATE usuario SET nombre = '" + nombre + "', mail = '" + mail + "' WHERE idusuario= " + req.params.idusuario;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
         res.send("Editado Usuario " + nombre );
        });
});

router.delete('/:idusuario', async (req, res) => {
    let query = "DELETE FROM `usuario` WHERE idusuario=" + req.params.idusuario;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/'); //Ver como mandar atoas
         };
         res.send("Borrado ID :" + req.params.idusuario);
         
        });
});