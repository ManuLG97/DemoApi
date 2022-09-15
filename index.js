//importamos express y controladores
import express from "express";
import alumnesRouter from './rutas/alumnesRouter.js';
import indexRouter from './rutas/indexRouter.js';
//instanciamos nueva aplicación express
const app = express();
//necesario para poder recibir datos en json
app.use(express.json());
//las rutas que empiecen por /api/alumnes se dirigirán a alumnesRouter
app.use('/', indexRouter);
app.use('/api/alumnes', alumnesRouter);
//arranque del servidor
const port = 3001;
app.listen(port, () => console.log(`App listening on port ${port}!`));