import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes'; // Importamos las rutas

const app = new Koa();

app.use(bodyParser()); // Middleware para parsear JSON

app.use(router.routes()).use(router.allowedMethods()); // Usamos las rutas

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
