import bodyParser from 'koa-bodyparser';

const { corsMiddleware } = require('./middlewares/corsMiddleware');
const config = require('./config.ts');
import routerAPI from './routes/apiV1.ts';
import Database from './utils/database';
import userMailCheck from './services/userMailCheck.ts';
import userPasswCheck from './services/userPasswCheck.ts';

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
// console.log('Checking mail');
if (await userMailCheck.checkMail('mail@test.com'))
    console.log('Mail already in use');
else
    console.log('Mail not in use');

// console.log('Checking password');
if (await userPasswCheck.checkPassw('mail@test.com', 'admin'))
    console.log('Password correct');
else
    console.log('Password incorrect');