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
    let query = "SELECT idrecurso, nombre FROM `recurso` ORDER BY idrecurso ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});

router.post('/', async (req, res) => {
    let nombre = req.body.nombre;
    let query = "INSERT INTO `recurso` (nombre) VALUES('"+nombre+"')";
    connection.query(query, (err, result) => {
            if (err) {
                res.send(err);
            };
            res.send("inserada Recurso " + nombre);
        });
});


router.get('/:idrecurso', async (req, res) => {
    let query = "SELECT * FROM `recurso` WHERE idrecurso=" + req.params.idrecurso +" ORDER BY idrecurso ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});


router.put('/:idrecurso', async (req, res) => {
    let nombre = req.body.nombre;
    let query = "UPDATE recurso SET nombre = '" + nombre + "' WHERE idrecurso= " + req.params.idrecurso;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
         res.send("Editada Recurso " + nombre );
        });
});

router.delete('/:idrecurso', async (req, res) => {
    let query = "DELETE FROM `recurso` WHERE idrecurso=" + req.params.idrecurso;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/'); //Ver como mandar atoas
         };
         res.send("Borrado ID :" + req.params.idrecurso);
         
        });
});