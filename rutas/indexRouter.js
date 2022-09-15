import express from 'express';
const router = express.Router();
router.get('/', function (req, res, next) {
res.end("Cambia la ruta a http://localhost:3001/api/peliculas");
});
export default router;