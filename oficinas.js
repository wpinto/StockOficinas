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
    let query = "SELECT idoficina, nombre FROM `oficina` ORDER BY idoficina ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});

router.post('/', async (req, res) => {
    let nombre = req.body.nombre;
    
    let query = "INSERT INTO `oficina` (nombre) VALUES('"+nombre+"')";
    connection.query(query, (err, result) => {
            if (err) {
                res.send(err);
            };
            res.send("inserada Oficina " + nombre);
        });
});


router.get('/:idoficina', async (req, res) => {
    let query = "SELECT * FROM `oficina` WHERE idoficina=" + req.params.idoficina +" ORDER BY idoficina ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});

router.put('/:idoficina', async (req, res) => {
    let nombre = req.body.nombre;
    let query = "UPDATE oficina SET nombre = '" + nombre + "' WHERE idoficina= " + req.params.idoficina;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
         res.send("Editada oficina " + nombre );
        });
});

router.delete('/:idoficina', async (req, res) => {
    let query = "DELETE FROM `oficina` WHERE idoficina=" + req.params.idoficina;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/'); //Ver como mandar atoas
         };
         res.send("Borrado ID :" + req.params.idoficina);
         
        });
});