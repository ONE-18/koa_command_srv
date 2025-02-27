const mongoose = require('mongoose');
const { User, Endpoint, Script, UserType, ScriptType } = require('./models');

async function insertaciones() {

    await User.deleteMany({}); // Borra todos los documentos de la colección Usuarios
    await Endpoint.deleteMany({}); // Borra todos los documentos de la colección Endpoints
    await Script.deleteMany({}); // Borra todos los documentos de la colección Scripts

    console.log('Todos los usuarios han sido eliminados');
  
    const user = new User({
        name: 'admin',
        password: 'admin',
        type: UserType.ADMIN
    });

    await user.save();

    const endpoint = new Endpoint({
        rute: '/api/v1',
        authentication: 'Bearer'
    });

    await endpoint.save();

    const script = new Script({
        name: 'script1',
        code: 'console.log("Hola mundo")',
        type: ScriptType.JS,
        userId: user._id,
        endpointId: endpoint._id
    });

    await script.save();

    const user2 = new User({
        name: 'user',
        password: 'user',
        type: UserType.USER
    });

    await user2.save();

    const script2 = new Script({
        name: 'script2',
        code: 'echo "Hola mundo"',
        type: ScriptType.SH,
        userId: user2._id,
        endpointId: endpoint._id
    });

    await script2.save();

}

async function insertar() {
    await insertaciones()
    .catch((e: string) => {
        console.error('Error al insertar datos:', e);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Datos insertados correctamente');
    });
}

async function consultaciones() {
    await mongoose.connect('mongodb://root:randompassword@mongodb/appDev?authSource=admin')
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err: string) => console.error('Error al conectar:', err));

    const users = await User.find();
    console.log('Usuarios:', users);

    const endpoints = await Endpoint.find();
    console.log('Endpoints:', endpoints);

    const scripts = await Script.find();
    console.log('Scripts:', scripts);
}

async function consultar() {
    await consultaciones()
    .catch((e: string) => {
        console.error('Error al consultar datos:', e);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Datos consultados correctamente');
    });
}

module.exports = { insertar, consultar };
