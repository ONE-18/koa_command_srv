const mongoose = require('mongoose');
await mongoose.connect('mongodb://root:randompassword@mongodb/appDev?authSource=admin') // TODO: use .env
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err: string) => console.error('Error al conectar:', err));

