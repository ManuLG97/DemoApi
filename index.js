//importamos express y controladores
import express from "express";
import peliculasRouter from './rutas/peliculasRouter.js';
import indexRouter from './rutas/indexRouter.js';
//instanciamos nueva aplicación express
const app = express();
//necesario para poder recibir datos en json
app.use(express.json());
//las rutas que empiecen por /api/peliculas se dirigirán a peliculasRouter
app.use('/', indexRouter);
app.use('/api/peliculas', peliculasRouter);
//arranque del servidor
const port = 3001;
app.listen(port, () => console.log(`App listening on port ${port}!`));