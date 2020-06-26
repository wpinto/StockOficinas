var express = require('express');
var router = express.Router();
var app = express();
module.exports = router;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
//api

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let query = "SELECT stock.idstock, oficina.nombre AS Oficina, usuario.nombre AS Usuario, recurso.nombre AS Recurso, stock.estado AS Estado FROM stock INNER JOIN oficina ON stock.idoficina = oficina.idoficina INNER JOIN usuario ON stock.idusuario = usuario.idusuario INNER JOIN recurso ON stock.idrecurso = recurso.idrecurso";
    connection.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        };
        res.send(result);
    });
});

router.post('/', async (req, res) => {
    let idusuario = req.body.idusuario;
    let idrecurso = req.body.idrecurso;
    let idoficina = req.body.idoficina;
    let estado = req.body.estado;

    let query = "INSERT INTO `stock` (idoficina, idusuario, idrecurso,estado) VALUES(" + idoficina + "," + idusuario + "," + idrecurso + "," + estado + ")";

    connection.query(query, (err, result) => {
        if (err) {
            res.send(err);
        };
        res.send("Orden creada");
    });
});

router.get('/:idstock', async (req, res) => {
    let query = "SELECT stock.idstock, oficina.nombre AS oficina, usuario.nombre AS usuario, stock.estado FROM stock INNER JOIN oficina ON stock.idoficina = oficina.idoficina INNER JOIN usuario ON stock.idusuario = usuario.idusuario WHERE stock.idstock = " + req.params.idstock;
    connection.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        };
        res.send(result);
    });
});


router.patch('/:idstock', async (req, res) => {
    let estado = req.body.estado;
    let query = "UPDATE stock SET estado = " + estado + " WHERE idstock = " + req.params.idstock;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        };
        res.send("Editado stock " + req.params.idstock + " a estado " + estado);
    });
});

router.delete('/:idstock', async (req, res) => {
    let query = "DELETE FROM `stock` WHERE idstock=" + req.params.idstock;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        };
        res.send("Borrado ID :" + req.params.idstock);
    });
});