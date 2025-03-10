import bodyParser from 'koa-bodyparser';
import type { Context } from 'koa';

const { corsMiddleware } = require('./middlewares/corsMiddleware');
const config = require('./config.ts');
import routerAPI from './routes/apiV1.ts';
import Database from './utils/database';
import router from './routes/generalRoutes.ts';
import { login } from './controllers/loginCntrl';
// import userPasswCheck from './services/userPasswCheck.ts'; // TODO: retirar test de aquí
import { /*insertar,*/ consultar } from './seed.ts';

const db = new Database();
db.connect();

// Ejecutar el seeding
// await insertar()

// Consultar los datos insertados
await consultar()

// Cerrar la conexión
// await db.disconnect();

// Iniciar el servidor
const Koa = require('koa');
const app = new Koa();

app.use(bodyParser());
app.use(corsMiddleware(config.CORS_SYSTEMAPI_ALLOWED_ORIGINS, config.CORS_SYSTEMAPI_EXCLUDED_ENDPOINTS));

app.use(router.routes());

app.use(routerAPI.routes());
app.use(routerAPI.allowedMethods());

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
});

// TESTS:
const testLogin = async (email: string, password: string) => {
  const ctx = {
    request: {
      body: { email, password }
    },
    status: 0,
    body: {}
  } as any as Context;

  await login(ctx);

  if (ctx.status === 200) {
    console.log(`Login successful for ${email}`);
  } else {
    console.log(`Login failed for ${email}`);
  }
};

await testLogin('mail@test.com', 'noadmin');
await testLogin('mail@test.com', 'admin');

db.disconnect();