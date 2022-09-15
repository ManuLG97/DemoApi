import express from 'express';
import { DataTypes } from "sequelize";
import sequelize from "../loadSequelize.js";
//DEFINICION DEL MODELO
const Pelicula = sequelize.define('Pelicula', {
nombre: DataTypes.STRING,
año_estreno: DataTypes.STRING,
plataforma:DataTypes.STRING,
tipo:DataTypes.STRING

}, { tableName: 'peliculas', timestamps: false });

const router = express.Router();
// GET lista de todos los alumnes
// vinculamos la ruta /api/alumnes a la función declarada
// si todo ok devolveremos un objeto tipo:
// {ok: true, data: [lista_de_objetos_alumne...]}
// si se produce un error:
// {ok: false, error: mensaje_de_error}
router.get('/', function (req, res, next) {
sequelize.sync().then(() => {
Pelicula.findAll()
.then(peliculas => res.json({
ok: true,
data: peliculas
}))
.catch(error => res.json({
ok: false,
error: error
}))
}).catch((error) => {
res.json({
ok: false,
error: error
})
});
});
// GET de un solo alumne
router.get('/:tipo', function (req, res, next) {

sequelize.sync().then(() => {
Pelicula.findAll({ where: { tipo: req.params.tipo } })
// .then(Alumne => Alumne.get({plain: true}))
.then(Pelicula => res.json({
ok: true,
data: Pelicula
}))
.catch(error => res.json({
ok: false,
error: error
}))
}).catch((error) => {
res.json({
ok: false,
error: error
})
});
});

// POST, creació d'un nou alumne
router.post('/', function (req, res, next) {
sequelize.sync().then(() => {
Pelicula.create(req.body)
.then((item) => item.save())
.then((item) => res.json({ ok: true, data: item }))
.catch((error) => res.json({ ok: false, error }))
}).catch((error) => {
res.json({
ok: false,
error: error
})
});
});
// put modificació d'un pelicula
router.put('/:id', function (req, res, next) {
sequelize.sync().then(() => {
Pelicula.findOne({ where: { id: req.params.id } })
.then((al) =>
al.update(req.body)
)
.then((ret) => res.json({
ok: true,
data: ret
}))
.catch(error => res.json({
ok: false,
error: error
}));
}).catch((error) => {
res.json({
ok: false,
error: error

})
});
});

// DELETE elimina pelicula id
router.delete('/:id', function (req, res, next) {
sequelize.sync().then(() => {
Pelicula.destroy({ where: { id: req.params.id } })
.then((data) => res.json({ ok: true, data }))
.catch((error) => res.json({ ok: false, error }))
}).catch((error) => {
res.json({
ok: false,
error: error
})
});
});
export default router;