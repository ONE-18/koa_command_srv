const mongoose = require('mongoose');
const { insertar, consultar } = require('./seed');
const config = require('./config');
const { corsMiddleware } = require('./middlewares/corsMiddleware');

await mongoose.connect('mongodb://root:randompassword@mongodb/appDev?authSource=admin')
.then(() => console.log('Conectado a MongoDB'))
.catch((err: string) => console.error('Error al conectar:', err));

// Ejecutar el seeding
await insertar()

// Consultar los datos insertados
await consultar()


// Cerrar la conexión
await mongoose.connection.close()
