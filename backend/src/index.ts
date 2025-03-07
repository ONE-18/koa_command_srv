import bodyParser from 'koa-bodyparser';

const { corsMiddleware } = require('./middlewares/corsMiddleware');
const config = require('./config.ts');
import routerAPI from './routes/apiV1.ts';
import Database from './utils/database';
import userPasswCheck from './services/userPasswCheck.ts';
// import { insertar, consultar } from './seed.ts';

const db = new Database();
db.connect();

// Ejecutar el seeding
// await insertar()

// Consultar los datos insertados
// await consultar()

// Cerrar la conexión
// await db.disconnect();

// Iniciar el servidor
const Koa = require('koa');
const app = new Koa();

app.use(bodyParser());
app.use(corsMiddleware(config.CORS_SYSTEMAPI_ALLOWED_ORIGINS, config.CORS_SYSTEMAPI_EXCLUDED_ENDPOINTS));
// app.use(authMiddleware());

app.use(routerAPI.routes());
app.use(routerAPI.allowedMethods());

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
});

// TESTS:
// console.log('Checking password');
if (await userPasswCheck.checkPassw('mail@test.com', 'admin'))
    console.log('Login correct');
else
    console.log('Login incorrect');