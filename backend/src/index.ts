const mongoose = require('mongoose');
const { insertar, consultar } = require('./seed');
const { corsMiddleware } = require('./middlewares/corsMiddleware');
const config = require('./.config');
import bodyParser from 'koa-bodyparser';


await mongoose.connect('mongodb://root:randompassword@mongodb/appDev?authSource=admin')
.then(() => console.log('Conectado a MongoDB'))
.catch((err: string) => console.error('Error al conectar:', err));

// Ejecutar el seeding
await insertar()

// Consultar los datos insertados
await consultar()


// Cerrar la conexión
await mongoose.connection.close()


// Iniciar el servidor
const Koa = require('koa');
const app = new Koa();

app.use(bodyParser());
app.use(corsMiddleware(config.CORS_SYSTEMAPI_ALLOWED_ORIGINS, config.CORS_SYSTEMAPI_EXCLUDED_ENDPOINTS));
