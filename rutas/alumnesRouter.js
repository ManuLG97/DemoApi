import express from 'express';
import { DataTypes } from "sequelize";
import sequelize from "../loadSequelize.js";
//DEFINICION DEL MODELO
const Alumne = sequelize.define('Alumne', {
nom: DataTypes.STRING
}, { tableName: 'alumnes', timestamps: false });

const router = express.Router();
// GET lista de todos los alumnes
// vinculamos la ruta /api/alumnes a la función declarada
// si todo ok devolveremos un objeto tipo:
// {ok: true, data: [lista_de_objetos_alumne...]}
// si se produce un error:
// {ok: false, error: mensaje_de_error}
router.get('/', function (req, res, next) {
sequelize.sync().then(() => {
Alumne.findAll()
.then(alumnes => res.json({
ok: true,
data: alumnes
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
router.get('/:id', function (req, res, next) {

sequelize.sync().then(() => {
Alumne.findOne({ where: { id: req.params.id } })
// .then(Alumne => Alumne.get({plain: true}))
.then(Alumne => res.json({
ok: true,
data: Alumne
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
Alumne.create(req.body)
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
// put modificació d'un alumne
router.put('/:id', function (req, res, next) {
sequelize.sync().then(() => {
Alumne.findOne({ where: { id: req.params.id } })
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

// DELETE elimina l'alumne id
router.delete('/:id', function (req, res, next) {
sequelize.sync().then(() => {
Alumne.destroy({ where: { id: req.params.id } })
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